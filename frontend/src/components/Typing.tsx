"use client";

import React from "react";
import useTyping from "@/hooks/useTyping";
import Character from "@/components/Сharacter";

interface TypingProps {
    text: string;
}

const Typing = ({ text }: TypingProps) => {
    const { typed, clearTyped, cursor } = useTyping(true);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-xl mb-4 max-w-[60%]">
                {text.split("").map((char, i) => (
                    <Character key={i} char={char} typedChar={typed} index={i} isCursor={i === cursor} />
                ))}
            </div>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={clearTyped}>
                Clear
            </button>
        </div>
    );
};

export default Typing;
