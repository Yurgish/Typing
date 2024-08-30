"use client";

import Caret from "@/components/Caret";
import React, { useCallback } from "react";

interface CharacterProps {
    char: string;
    typedChar: string;
    className?: string;
    isCurrent: boolean;
}

const Character = ({ char, typedChar, isCurrent, className = "" }: CharacterProps) => {
    const isSpace = char === " ";
    const getCharacterClassName = useCallback(() => {
        if (isSpace) {
            return "";
        }
        if (typedChar) {
            return typedChar === char ? "text-green-400" : "text-red-400";
        } else {
            return "text-gray-400";
        }
    }, [char, isSpace, typedChar]);

    return (
        <span className={`relative ${className}`}>
            <span className={` ${getCharacterClassName()}`}>{isSpace ? "\u00A0" : char}</span>
            {isCurrent && <Caret />}
        </span>
    );
};

export default Character;
