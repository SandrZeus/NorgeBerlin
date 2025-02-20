import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import "../Styles/Header.css";
import logo from "../assets/logo_long.png";

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [showTicker, setShowTicker] = useState(true);
  const [articleTitles, setArticleTitles] = useState([]);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  const dropdownPaths = [
    "/informationen-fuer-gasteltern",
    "/informationen-fuer-gastschueler",
    "/berlin-tour",
  ];

  const isDropdownActive = dropdownPaths.includes(location.pathname);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  const handleNavClick = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
    }
    closeMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
      setShowTicker(window.scrollY <= 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/news");
        const data = await response.json();

        if (data.length > 0) {
          const titles = data.map((article) =>
            i18n.language === "de" ? article.title_de : article.title_en
          );

          // Fisher-Yates Shuffle Algorithm
          for (let i = titles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [titles[i], titles[j]] = [titles[j], titles[i]];
          }

          setArticleTitles(titles);
        }
      } catch (error) {
        console.error("Failed to fetch article titles:", error);
      }
    };

    fetchArticles();
  }, [i18n.language]); // Refetch titles when the language changes

  useEffect(() => {
    if (articleTitles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentTitleIndex(
        (prevIndex) => (prevIndex + 1) % articleTitles.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [articleTitles]);

  return (
    <>
      {/* News Ticker */}
      <div className={`news-ticker ${showTicker ? "" : "hidden"}`}>
        {articleTitles.length > 0 && (
          <span className="news-item-header">
            <span className="news-label">Latest News:</span>{" "}
            <NavLink
              to={`/aktuelles/${articleTitles[currentTitleIndex].slug}`}
              className="news-link"
            >
              {articleTitles[currentTitleIndex].title}
            </NavLink>
          </span>
        )}
      </div>

      {/* Main Header */}
      <div className={`header-container ${showTicker ? "" : "shrunk"}`}>
        <header className={isShrunk ? "shrink" : ""}>
          <div className="logo-container">
            <NavLink to="/">
              <img
                src={logo}
                alt="logo"
                className="nav-logo"
                onClick={() => handleNavClick("/")}
              />
            </NavLink>
          </div>
          <nav className={`nav-container ${menuActive ? "active" : ""}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  onClick={() => handleNavClick("/")}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/aktuelles"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  onClick={() => handleNavClick("/aktuelles")}
                >
                  {t("Aktuelles")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isDropdownActive ? "active-link" : ""
                  }
                  onClick={closeMenu}
                >
                  {t("Informationen")} ⮟
                </NavLink>
                <ul className="nav-dropdown">
                  <li className="nav-dropdown-item">
                    <NavLink
                      to="/informationen-fuer-gasteltern"
                      className={({ isActive }) =>
                        isActive ? "active-link" : ""
                      }
                      onClick={() =>
                        handleNavClick("/informationen-fuer-gasteltern")
                      }
                    >
                      {t("informationen-fuer-gasteltern")}
                    </NavLink>
                  </li>
                  <li className="nav-dropdown-item">
                    <NavLink
                      to="/informationen-fuer-gastschueler"
                      className={({ isActive }) =>
                        isActive ? "active-link" : ""
                      }
                      onClick={() =>
                        handleNavClick("/informationen-fuer-gastschueler")
                      }
                    >
                      {t("informationen-fuer-gastschueler")}
                    </NavLink>
                  </li>
                  <li className="nav-dropdown-item">
                    <NavLink
                      to="/berlintour"
                      className={({ isActive }) =>
                        isActive ? "active-link" : ""
                      }
                      onClick={() => handleNavClick("/berlintour")}
                    >
                      Berlin Tour
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/partnerschulen"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  onClick={() => handleNavClick("/partnerschulen")}
                >
                  {t("partnerschulen")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/organisation"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  onClick={() => handleNavClick("/organisation")}
                >
                  Organisation
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/kontakt"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  onClick={() => handleNavClick("/kontakt")}
                >
                  {t("kontakt")}
                </NavLink>
              </li>
            </ul>
            <LanguageSwitcher />
          </nav>
        </header>
      </div>
    </>
  );
};

export default Header;
