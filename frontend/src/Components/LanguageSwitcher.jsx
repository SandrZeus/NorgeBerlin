import React from "react";
import { useTranslation } from "react-i18next";
import enFlag from '../assets/en-flag.png';
import deFlag from '../assets/de-flag.png';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="language-switcher">
            <div 
                className="language-option"
                onClick={() => handleLanguageChange(currentLanguage === 'de' ? 'en' : 'de')}
                title={currentLanguage === 'de' ? 'Switch to English' : 'Switch to German'}
            >
                <img
                    src={currentLanguage === 'de' ? deFlag : enFlag} 
                    alt={currentLanguage === 'de' ? 'English' : 'German'} 
                />
            </div>
        </div>
    );
};

export default LanguageSwitcher;