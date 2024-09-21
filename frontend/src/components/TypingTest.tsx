"use client";

import Typing from "@/components/Typing";
import React, { useCallback, useEffect, useState } from "react";
import useTypingMetrics from "@/hooks/useTypingMetrics";
import { Progress } from "@nextui-org/react";

interface TypingTestProps {
    testTexts: string[];
}

const TypingTest = ({ testTexts }: TypingTestProps) => {
    const [isFinished, setIsFinished] = useState(false);
    const [currentTestIndex, setCurrentTestIndex] = useState(0);

    const { addTypingData, inputData, metricsResults, getAverageMetrics } = useTypingMetrics();

    const handleEndOfTest = useCallback(
        (typedText: string, timeElapsed: number) => {
            addTypingData({
                elapsedTime: timeElapsed,
                typedText,
                correctText: testTexts[currentTestIndex],
            });

            if (currentTestIndex < testTexts.length - 1) {
                setCurrentTestIndex((prev) => prev + 1);
            } else {
                setCurrentTestIndex((prev) => prev + 1);
                setIsFinished(true);
            }
        },
        [addTypingData, testTexts, currentTestIndex]
    );

    useEffect(() => {
        if (isFinished) {
            console.log(inputData, metricsResults, getAverageMetrics(metricsResults));
        }
    }, [getAverageMetrics, inputData, isFinished, metricsResults]);

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
            {!isFinished ? (
                <>
                    <Typing key={currentTestIndex} text={testTexts[currentTestIndex]} onComplete={handleEndOfTest} />
                </>
            ) : (
                <div className="text-center">
                    <h2>Lesson Completed!</h2>
                </div>
            )}
            <Progress
                size="sm"
                aria-label="Tests Progres"
                value={(currentTestIndex / testTexts.length) * 100}
                className="mt-14"
            />
        </div>
    );
};

export default TypingTest;
