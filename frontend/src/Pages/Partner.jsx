import React from "react";
import { useTranslation } from "react-i18next";
import "../Styles/index.css";
import "../Styles/Partner.css";
import Kongshavn from "../assets/Kongshavn.jpg";
import PaulNatorp from "../assets/Paul-Natorp-Gymnasium.jpg";
import FelixMandelssohn from "../assets/Felix-Mandelssohn.jpg";

const Partner = () => {
  const { t } = useTranslation();

  return (
    <div className="page">
      <br />
      <br />
      <br />
      <br />
      <h1>{t("PartnerHeader")} in Oslo</h1>
      <div className="partner-block">
        <div className="partner-info">
          <h2>Kongshavn Videregående Skole</h2>
          <br />
          <br />
          <p>{t("PartnerText1")}</p>
          <br />
          <p>
            <b>{t("PartnerAddress")}</b>Kongsveien 30, 0193 Oslo
          </p>
          <br />
          <hr
            style={{
              border: "1px solid rgba(234, 236, 238, 0.55)",
              width: "100%",
            }}
          />
          <br />
          <a
            href="https://kongshavn.vgs.no/"
            className="button-Partner"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("PartnerVisit")}
          </a>
        </div>
        <div className="partner-image-container">
          <div className="partner-image">
            <img src={Kongshavn} alt="Kongshavn Videregående Skole" />
            <p style={{ fontSize: "12px", color: "gray", textAlign: "center" }}>
              © kongshavn.vgs.no
            </p>
          </div>
        </div>
      </div>
      <br />
      <hr
        style={{ border: "1px solid rgba(234, 236, 238, 0.55)", width: "100%" }}
      />
      <br />
      <h1>{t("PartnerHeader")} in Berlin</h1>
      <div className="partner-block">
        <div className="partner-info">
          <h2>Paul-Natorp-Gymnasium</h2>
          <br />
          <br />
          <p>{t("PartnerText2")}</p>
          <br />
          <p>
            <b>{t("PartnerAddress")}</b>Goßlerstraße 13, 12161 Berlin
          </p>
          <br />
          <hr
            style={{
              border: "1px solid rgba(234, 236, 238, 0.55)",
              width: "100%",
            }}
          />
          <br />
          <a
            href="https://www.natorp-gymnasium.de/aktuelles"
            className="button-Partner"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("PartnerVisit")}
          </a>
        </div>
        <div className="partner-image-container">
          <div className="partner-image">
            <img src={PaulNatorp} alt="Paul-Natorp-Gymnasium" />
            <p style={{ fontSize: "12px", color: "gray", textAlign: "center" }}>
              © de.wikipedia.org
            </p>
          </div>
        </div>
      </div>
      <br />
      <hr
        style={{ border: "1px solid rgba(234, 236, 238, 0.55)", width: "100%" }}
      />
      <br />
      <div className="partner-block">
        <div className="partner-info">
          <h2>Felix-Mendelssohn-Bartholdy-Gymnasium</h2>
          <br />
          <br />
          <p>{t("PartnerText3")}</p>
          <br />
          <p>
            <b>{t("PartnerAddress")}</b>Pasteurstr. 7, 10407 Berlin
          </p>
          <br />
          <hr
            style={{
              border: "1px solid rgba(234, 236, 238, 0.55)",
              width: "100%",
            }}
          />
          <br />
          <a
            href="https://fmbg-berlin.de/"
            className="button-Partner"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("PartnerVisit")}
          </a>
        </div>
        <div className="partner-image-container">
          <div className="partner-image">
            <img src={FelixMandelssohn} alt="Kongshavn Videregående Skole" />
            <p style={{ fontSize: "12px", color: "gray", textAlign: "center" }}>
              © fmbg-berlin.de
            </p>
          </div>
        </div>
      </div>
      <br />
      <hr
        style={{ border: "1px solid rgba(234, 236, 238, 0.55)", width: "100%" }}
      />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Partner;
