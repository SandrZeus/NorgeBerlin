import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import "../Styles/Header.css";

import logo from "../assets/logo_long.png";

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(false);

  const dropdownPaths = [
    '/informationen-fuer-gasteltern',
    '/informationen-fuer-gastschueler',
    '/berlintour',
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
      <div className="logo-container">
        <NavLink to="/">
          <img src={logo} alt="logo" className="nav-logo" />
        </NavLink>
      </div>
      <nav className={`nav-container ${menuActive ? "active" : ""}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/aktuelles" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={closeMenu}>
              {t("Aktuelles")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/events" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={closeMenu}>
              Events
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isDropdownActive ? "active-link" : "" } onClick={closeMenu}>
            {t("Informationen")}⮟
            </NavLink>
            <ul className="nav-dropdown">
              <li className="nav-dropdown-item">
                <NavLink
                  to="/informationen-fuer-gasteltern"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  onClick={closeMenu} // Close menu when clicked
                >
                  {t("informationen-fuer-gasteltern")}
                </NavLink>
              </li>
              <li className="nav-dropdown-item">
                <NavLink
                  to="/informationen-fuer-gastschueler"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  onClick={closeMenu} // Close menu when clicked
                >
                  {t("informationen-fuer-gastschueler")}
                </NavLink>
              </li>
              <li className="nav-dropdown-item">
                <NavLink
                  to="/berlintour"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  onClick={closeMenu} // Close menu when clicked
                >
                  Berlin Tour
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <NavLink to="/partnerschulen" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={closeMenu}>
              {t("partnerschulen")}
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/organisation" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={closeMenu}>
              Organisation
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/kontakt" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={closeMenu}>
            {t("kontakt")}
            </NavLink>
            </li>
        </ul>
        <LanguageSwitcher />
      </nav>
    </header>
  );
};

export default Header;
