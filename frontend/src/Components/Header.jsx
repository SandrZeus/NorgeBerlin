import React, { useState} from "react";
import { NavLink, useLocation} from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const dropdownPaths = [
        '/information-for-host-parents',
        '/information-for-guest-students',
        '/berlin-tour',
    ];
    const isDropdownActive = dropdownPaths.includes(location.pathname);
    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };
    const closeMenu = () => {
        setMenuActive(false);
    };

    return (
        <header>
            
        </header>
    );
};

export default Header;
