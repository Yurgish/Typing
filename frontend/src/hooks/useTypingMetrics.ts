import { useCallback, useState } from "react";

interface TypingMetrics {
    grossWPM: number;
    netWPM: number;
    accuracy: number;
    cpm: number;
}

interface TypingInputValues {
    elapsedTime: number | null;
    typedText: string;
    correctText: string;
}

const useTypingMetrics = () => {
    const [inputData, setInputData] = useState<TypingInputValues[]>([]);
    const [metricsResults, setMetricsResults] = useState<TypingMetrics[]>([]);

    const calculateCurrentMetrics = useCallback(
        ({ elapsedTime, typedText, correctText }: TypingInputValues): TypingMetrics => {
            if (elapsedTime === null)
                return {
                    grossWPM: 0,
                    netWPM: 0,
                    accuracy: 0,
                    cpm: 0,
                };

            const typedTextLength = typedText.length;
            const correctTextLength = correctText.length;
            const wordCount = typedTextLength / 5;
            const grossWPM = wordCount / elapsedTime;

            const totalErrors = Array.from(typedText).reduce((errors, char, i) => {
                return char !== correctText[i] ? errors + 1 : errors;
            }, 0);

            const netWPM = grossWPM - totalErrors / elapsedTime;
            const accuracy = ((typedTextLength - totalErrors) / correctTextLength) * 100;
            const cpm = typedTextLength / elapsedTime;

            return {
                grossWPM,
                netWPM,
                accuracy,
                cpm,
            };
        },
        []
    );

    const addTypingData = useCallback(
        ({ elapsedTime, typedText, correctText }: TypingInputValues): void => {
            setInputData((prevData) => [...prevData, { elapsedTime, typedText, correctText }]);

            const metrics = calculateCurrentMetrics({ elapsedTime, typedText, correctText });
            setMetricsResults((prevMetrics) => [...prevMetrics, metrics]);
        },
        [calculateCurrentMetrics]
    );

    const getAverageMetrics = (metricsArray: TypingMetrics[]): TypingMetrics => {
        const totalMetrics = metricsArray.reduce(
            (acc, metrics) => {
                acc.grossWPM += metrics.grossWPM;
                acc.netWPM += metrics.netWPM;
                acc.accuracy += metrics.accuracy;
                acc.cpm += metrics.cpm;
                return acc;
            },
            { grossWPM: 0, netWPM: 0, accuracy: 0, cpm: 0 }
        );

        const count = metricsArray.length;

        return {
            grossWPM: totalMetrics.grossWPM / count,
            netWPM: totalMetrics.netWPM / count,
            accuracy: totalMetrics.accuracy / count,
            cpm: totalMetrics.cpm / count,
        };
    };

    return {
        inputData,
        metricsResults,
        addTypingData,
        calculateCurrentMetrics,
        getAverageMetrics,
    };
};

export default useTypingMetrics;
