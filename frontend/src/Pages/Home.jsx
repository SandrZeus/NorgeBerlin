import React from 'react';
import "../Styles/index.css";
import "../Styles/Home.css";
import { useTranslation } from "react-i18next";

import BrandenburgerTor from "../assets/reiseuhu-brandenburger-tor-unsplash.jpg";
import HomeImage1 from "../assets/homeimage1.png";
import HomeImage2 from "../assets/homeimage2.jpg";
import HomeImage3 from "../assets/homeimage3.png";
import ProfilePic from "../assets/Torunn-Thomassen.jpg";

const Home = () => {

    const { t } = useTranslation();

    return (
        <>
            <div className="background-home">
                <img src={BrandenburgerTor} alt="Brandenburger Tor" />
                <p className='home-title'>
                    God dag
                    <br />
                    <span style={{ fontSize: '35px' }}>{t("HomeTitle")}</span>
                </p>
                <div className="white-block">
                    <div className="home-texts">
                        <h1 style={{ fontFamily: 'Playfair Display', fontWeight: 300 }}>{t("HomeTitle1")}</h1>
                        <p dangerouslySetInnerHTML={{ __html: t("HomeText1") }}></p>
                        <p>{t("HomeText2")}</p>
                        <p>{t("HomeText3")}</p>
                    </div>
                    <div className="home-images">
                        <img src={HomeImage1} />
                        <img src={HomeImage2} />
                    </div>
                </div>
            </div>
            <div className="page">
                <div className='home-image'>
                    <img src={HomeImage3}/>
                </div>
                <h1 style={{ justifyContent: 'center', display: 'flex', fontFamily: 'Playfair Display', fontWeight: 300}}>{t("HomeTitle2")}</h1>
                <br />
                <br />
                <br />
                <br />
                <h2 style={{display: 'flex', fontFamily: 'Playfair Display', fontWeight: 300}}>Torunn Thomassen</h2>
                <br />
                <i  style={{ color: 'gray'}}>{t("HomeText4")}</i>
                <br />
                <br />
                <div className='home-block'>
                    <div className='home-block-texts'>
                        <h2 style={{display: 'flex', fontWeight: 500, fontStyle: 'italic', color: 'balck'}}>"{t("HomeQuote")}"</h2>
                        <p style={{ color: 'gray'}}>{t("HomeText5")}</p>
                        <p style={{ color: 'gray'}}>{t("HomeText6")}</p>
                        <p style={{ color: 'gray'}}>{t("HomeText7")}</p>
                        <p style={{ color: 'gray'}}>{t("HomeText8")}</p>
                    </div>
                    <div className='home-images'>
                        <img src={ProfilePic} />
                    </div>
                </div>
                <br />
                <br />
                <br />
                <h2 style={{display: 'flex', fontFamily: 'Playfair Display', fontWeight: 300}}>{t("HomeTitle3")}</h2>
                <br />
                <hr style={{ border: '1px solid rgba(234, 236, 238, 0.55)' }} />
                <br />
                <p>{t("HomeText9")}: <a href="http://www.norwegen.no/" style={{color: 'red', textDecoration: 'none'}}>http://www.norwegen.no/</a></p>
                <br />
                <p>Kongshavn Videregående Skole in Oslo: <a href="https://kongshavn.vgs.no/" style={{color: 'red', textDecoration: 'none'}}>https://kongshavn.vgs.no/</a></p>
                <br />
                <p>Paul-Natorp-Gymnasium: <a href="http://www.natorp.de/schulprofil/oslo/projekt.html" style={{color: 'red', textDecoration: 'none'}}>http://www.natorp.de/schulprofil/oslo/projekt.html</a></p>
                <br />
                <p>Mendelssohn-Bartholdy-Gymnasium: <a href="http://www.mendelssohn-bartholdy-gymnasium.de/" style={{color: 'red', textDecoration: 'none'}}>http://www.mendelssohn-bartholdy-gymnasium.de/</a></p>
                <br />
                <p>{t("HomeText10")}: <a href="http://www.clioberlin.de" style={{color: 'red', textDecoration: 'none'}}>http://www.clioberlin.de</a></p>
                <br />
                <p>{t("HomeText11")}: <a href="https://www.findQ.de" style={{color: 'red', textDecoration: 'none'}}>https://www.findQ.de</a></p>
            </div>
            <br />
            <br />
            <br />
        </>
    );
};

export default Home;