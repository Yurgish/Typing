import React from "react";
import { Navbar, NavbarContent } from "@nextui-org/react";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Header: React.FC = () => {
    return (
        <Navbar position="static">
            <NavbarContent>
                <ThemeSwitcher />
            </NavbarContent>
        </Navbar>
    );
};

export default Header;
