import React from 'react';
import "../Styles/index.css";
import "../Styles/Home.css";
import { useTranslation } from "react-i18next";

import BrandenburgerTor from "../assets/reiseuhu-brandenburger-tor-unsplash.jpg";

const Home = () => {

    const { t } = useTranslation();

    return (
        <>
            <div className="background-home">
                <img src={BrandenburgerTor} alt="Brandenburger Tor" />
                <p className='home-text'>
                    God dag
                    <br />
                    <span style={{ fontSize: '35px' }}>{t("HomeTitle")}</span>
                </p>
                <div className="white-block">
                    <h1>{t("HomeTitle1")}</h1>
                    <p>{t("HomeText1")}</p>
                    <p>{t("HomeText2")}</p>
                    <p>{t("HomeText3")}</p>
                </div>
            </div>
        </>
    );
};

export default Home;