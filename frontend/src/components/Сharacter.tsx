import Caret from "@/components/Caret";
import React, { useCallback } from "react";

interface CharacterProps {
    char: string;
    typedChar: string;

    isCurrent: boolean;
}

const Character = ({ char, typedChar, isCurrent }: CharacterProps) => {
    const isSpace = char === " ";
    const getCharacterClassName = useCallback(() => {
        if (isSpace) {
            return;
        }
        if (typedChar) {
            return typedChar === char ? "text-green-500" : "text-red-500";
        } else {
            return "text-gray-500";
        }
    }, [char, isSpace, typedChar]);

    return (
        <span className="relative ">
            <span className={` ${getCharacterClassName()}`}>{isSpace ? "\u00A0" : char}</span>
            {isCurrent && <Caret />}
        </span>
    );
};

export default Character;
