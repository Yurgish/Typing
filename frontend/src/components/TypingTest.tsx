"use client";

import Typing from "@/components/Typing";
import React, { useCallback, useEffect, useState } from "react";
import useTypingMetrics from "@/hooks/useTypingMetrics";

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
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {!isFinished ? (
                <Typing key={currentTestIndex} text={testTexts[currentTestIndex]} onComplete={handleEndOfTest} />
            ) : (
                <div className="text-center">
                    <h2>Lesson Completed!</h2>
                </div>
            )}
        </div>
    );
};

export default TypingTest;
