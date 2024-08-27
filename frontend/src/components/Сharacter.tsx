import React, { useCallback } from "react";

interface CharacterProps {
    char: string;
    typedChar: string;
    index: number;
    isCursor: boolean;
}

const Character = ({ char, typedChar, index, isCursor }: CharacterProps) => {
    const getCharacterClassName = useCallback(() => {
        if (index < typedChar.length) {
            if (char === " " && typedChar[index] !== " ") {
                return "bg-red-500"; // Highlight spaces as red if incorrect
            } else if (typedChar[index] === char) {
                return "text-green-500"; // Correct character
            } else {
                return "text-red-500"; // Incorrect character
            }
        }
    }, [char, index, typedChar]);

    return (
        <span className={`relative ${getCharacterClassName()}`}>
            {char}
            {isCursor && <span className="absolute bottom-0 left-0 h-6 border-r-2 border-blue-500" />}
        </span>
    );
};

export default Character;
