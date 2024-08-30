import React, { useEffect } from "react";
import useTyping from "@/hooks/useTyping";
import Character from "@/components/Сharacter";

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
                    <div key={wordIndex} className="word">
                        {word.split("").map((char, charIndex) => {
                            const typedChar = typedWord[charIndex];
                            const isCurrent = isCurrentWord && charIndex === typedWord.length;

                            return (
                                <Character
                                    key={`${char}-${wordIndex}-${charIndex}`}
                                    char={char}
                                    typedChar={typedChar}
                                    isCurrent={isCurrent}
                                />
                            );
                        })}
                        {/* Додавання пробілу після кожного слова, крім останнього */}
                        {wordIndex < words.length - 1 && (
                            <Character
                                key={`space-${wordIndex}`}
                                char=" "
                                typedChar={typedWord[typedWord.length]}
                                isCurrent={isCurrentWord && typedWord.length === word.length}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Typing;
