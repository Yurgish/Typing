import React, { useEffect } from "react";
import useTyping from "@/hooks/useTyping";
import Word from "@/components/Word";

interface TypingProps {
    text: string;
    onComplete: (typedText: string, timeElapsed: number) => void;
}

const Typing = ({ text, onComplete }: TypingProps) => {
    const { typed, clearTyped, currentWordIndex, words, isEndOfString, calculateTimeElapsed, setEndTime } = useTyping(
        text,
        true
    );

    useEffect(() => {
        clearTyped();
    }, [text, clearTyped]);

    useEffect(() => {
        if (isEndOfString) {
            setEndTime();
            const timeElapsed = calculateTimeElapsed();
            onComplete(typed, timeElapsed);
        }
    }, [currentWordIndex, words.length, typed, text, onComplete, setEndTime, calculateTimeElapsed, isEndOfString]);

    return (
        <div className="text-4xl mb-4 max-w-[70%] flex flex-wrap">
            {words.map((word, wordIndex) => {
                const typedWord = typed.split(" ")[wordIndex] || "";
                const isCurrentWord = wordIndex === currentWordIndex;

                return (
                    <Word
                        key={wordIndex}
                        word={word}
                        typedWord={typedWord}
                        isCurrentWord={isCurrentWord}
                        wordIndex={wordIndex}
                        currentWordIndex={currentWordIndex}
                        wordsLength={words.length}
                    />
                );
            })}
        </div>
    );
};

export default Typing;
