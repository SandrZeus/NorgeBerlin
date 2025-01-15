import i18 from i18next;
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HTTPApi from "i18next-http-backend";

i18net
    .use(HTTPApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: "en",
        backend: {
            loadPath: "/locales/{{lng}}/translation.json",
        },
        interpolation: {
            escapeValue: false,
        }
    })

export default i18;