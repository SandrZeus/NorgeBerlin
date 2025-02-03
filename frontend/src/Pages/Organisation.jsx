import React from 'react';
import "../Styles/index.css";
import "../Styles/Organisation.css";
import { useTranslation } from "react-i18next";

import OrganisationPic from "../assets/sabine-freiberger-unsplash.jpg";
import Nadja from "../assets/NadjaRaabe.jpg";

const Organisation = () => {
    
    const { t } = useTranslation();

    return (
        <>
            <img src={OrganisationPic} className='background-organisation' />
            <div className='page'>
                <h2>{t("OrganisationTitle1")}</h2>
                <br />
                <h2 style={{fontWeight: '600'}}>Nadja Raabe</h2>
                <br />
                <div className='organisation-block'>
                    <div className='organisation-block-texts'>
                        <p style={{ color: 'gray'}}>{t("OrganisationText1")}</p>
                        <br />
                        <p style={{ color: 'gray'}}>{t("OrganisationText2")}</p>
                        <br />
                        <p style={{ color: 'gray'}}>{t("OrganisationText3")}</p>
                    </div>
                    <div className='organisation-image-container' >
                        <img src={Nadja} className='organisation-image'/>
                        <h6 style={{ color: 'gray', fontWeight: '500'}}>Nadja Raabe, Managing Director Namola UG (haftungsbeschränkt)</h6>
                    </div>
                </div>
                <h2>{t("OrganisationTitle2")}</h2>
                <br />
                <h2 style={{fontWeight: '600'}}>Namola UG (haftungsbeschränkt)</h2>
                <br />
                <p style={{ color: 'gray', width: '65%'}}>{t("OrganisationText4")}</p>
                <br />
                <a href="https://findq.berlin/socialresponsibility/" className="button" target="_blank" rel="noopener noreferrer">{t("OrganisationText5")}</a>
                <br />
                <br />
                <hr style={{ border: '1px solid rgba(234, 236, 238, 0.55)', width: '65%' }} />
                <br />
            </div>
            <br />
            <br />
            <br />
            <br />
        </>
    );
};

export default Organisation;