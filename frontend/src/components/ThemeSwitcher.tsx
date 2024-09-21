"use client";

import React, { useEffect } from "react";
import { VisuallyHidden, useSwitch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { MoonIcon } from "@/components/icons/MoonIcon";
import { SunIcon } from "@/components/icons/SunIcon";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch();

    useEffect(() => {
        const theme = isSelected ? "dark" : "light";
        setTheme(theme);
    }, [isSelected, setTheme]);

    return (
        <Component {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <div
                {...getWrapperProps()}
                className={slots.wrapper({
                    class: [
                        "w-8 h-8",
                        "flex items-center justify-center",
                        "rounded-lg bg-default-100 hover:bg-default-200",
                    ],
                    color: "default",
                })}
            >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </div>
        </Component>
    );
};

export default ThemeSwitcher;
