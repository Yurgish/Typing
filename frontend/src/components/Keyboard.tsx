import React, { useCallback } from "react";
import { motion } from "framer-motion";

interface KeyboardProps {
    nextKey: string;
}

const keys = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
    ["Space"],
];

const Keyboard = ({ nextKey }: KeyboardProps) => {
    const getKeyId = (key: string) => {
        switch (key) {
            case " ":
                return "Space";
            case "backspace":
                return "Backspace";
            case "tab":
                return "Tab";
            case "enter":
                return "Enter";
            case "shift":
                return "Shift";
            case "\\":
                return "\\";
            default:
                return key;
        }
    };

    const getKeyClassName = useCallback(
        (key: string) => {
            const isActive = key.toUpperCase() === getKeyId(nextKey || "").toUpperCase();
            return isActive ? "bg-primary-300 text-white" : "bg-default-100";
        },
        [nextKey]
    );

    const isKeyActive = (key: string) => {
        return key.toUpperCase() === getKeyId(nextKey || "").toUpperCase();
    };

    return (
        <div className="p-3 text-base bg-default-200 flex rounded-lg flex-col items-center gap-1">
            {keys.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                    {row.map((key, keyIndex) => (
                        <motion.div
                            animate={isKeyActive(key) ? { scale: 1.1 } : { scale: 1 }}
                            key={`${key}-${keyIndex}`}
                            className={`rounded px-4 py-2 ${getKeyClassName(key)}`}
                            transition={{ duration: 0.3 }}
                        >
                            {key}
                        </motion.div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;
