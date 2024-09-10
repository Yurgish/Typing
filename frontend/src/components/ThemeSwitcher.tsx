"use client";

import React, { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
    const [isSelected, setIsSelected] = useState(true);
    const { setTheme } = useTheme();

    useEffect(() => {
        const theme = isSelected ? "dark" : "light";
        setTheme(theme);
    }, [isSelected, setTheme]);

    return (
        <Switch isSelected={isSelected} onValueChange={setIsSelected} aria-label="Theme changer">
            Theme changer
        </Switch>
    );
};

export default ThemeSwitcher;
