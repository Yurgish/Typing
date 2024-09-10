import { useCallback, useEffect, useState, useRef } from "react";

const enableSpaceSkipping = true;

export const isKeyboardCodeAllowed = (code: string) => {
    return (
        code.startsWith("Key") ||
        code.startsWith("Digit") ||
        code === "Backspace" ||
        code === "Space" ||
        code === "Comma" ||
        code === "Period" ||
        code === "Minus" ||
        code === "Semicolon" ||
        code === "Quote" ||
        code === "BracketLeft" ||
        code === "BracketRight"
    );
};

const useTyping = (text: string, enabled: boolean) => {
    const [typed, setTyped] = useState<string>("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const endTime = useRef<number | null>(null);

    const [isEndOfString, setIsEndOfString] = useState(false);

    const words = text.split(" ");
    const currentWord = words[currentWordIndex] || "";
    const typedWords = typed.split(" ");
    const currentTypedWord = typedWords[currentWordIndex] || "";

    const checkIsEndOfString = useCallback(() => {
        if (currentWordIndex === words.length - 1 && currentTypedWord.length === currentWord.length) {
            setIsEndOfString(true);
        }
    }, [currentWordIndex, currentTypedWord, currentWord, words.length]);

    const keydownHandler = useCallback(
        ({ key, code }: KeyboardEvent) => {
            if (!enabled || !isKeyboardCodeAllowed(code)) {
                return;
            }

            if (startTime === null) {
                setStartTime(Date.now());
            }

            if (key === "Backspace") {
                setTyped((prev) => prev.slice(0, -1));

                if (currentTypedWord.length === 0 && currentWordIndex > 0) {
                    setCurrentWordIndex(currentWordIndex - 1);
                }

                return;
            }
            if (key === " ") {
                if (enableSpaceSkipping) {
                    setTyped((prev) => prev + key);

                    if (currentWordIndex === words.length - 1) {
                        setIsEndOfString(true);
                        return;
                    }

                    setCurrentWordIndex(currentWordIndex + 1);
                    return;
                }
                if (currentTypedWord === currentWord) {
                    setTyped((prev) => prev + key);
                    setCurrentWordIndex(currentWordIndex + 1);
                }
                return;
            }

            if (currentTypedWord.length < currentWord.length) {
                setTyped((prev) => prev + key);
            }
        },
        [enabled, startTime, currentTypedWord, currentWord, currentWordIndex, words.length]
    );

    useEffect(() => {
        checkIsEndOfString();
    }, [checkIsEndOfString, currentWordIndex]);

    const clearTyped = useCallback(() => {
        setTyped("");
        setCurrentWordIndex(0);
        setStartTime(null);
        endTime.current = null;
        setIsEndOfString(false);
    }, []);

    const calculateTimeElapsed = useCallback(() => {
        if (startTime === null || endTime.current === null) {
            return 0;
        }
        console.log(
            endTime.current - startTime,
            (endTime.current - startTime) / 1000,
            (endTime.current - startTime) / 1000 / 60
        );
        return (endTime.current - startTime) / 1000 / 60;
    }, [startTime]);

    useEffect(() => {
        window.addEventListener("keydown", keydownHandler);
        return () => {
            window.removeEventListener("keydown", keydownHandler);
        };
    }, [keydownHandler]);

    const setEndTime = () => {
        endTime.current = Date.now();
    };

    return {
        typed,
        currentWordIndex,
        words,
        isEndOfString,
        clearTyped,
        calculateTimeElapsed,
        setEndTime,
    };
};

export default useTyping;
