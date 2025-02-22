import React from "react";
import "../Styles/index.css";
import "../Styles/Partner.css";
import Kongshavn from "../assets/Kongshavn.jpg";

const Partner = () => {
  return (
    <div className="page">
      <h1>Partner Schools in Oslo</h1>
      <div className="partner-block">
        <div className="partner-info" style={{ width: "50%" }}>
          <h2>Kongshavn Videregående Skole</h2>
          <br />
          <br />
          <p>
            Kongshavn Videregående Skole is a high school in Oslo, Norway, known
            for its diverse educational programs and vibrant student life. The
            school offers a range of courses and extracurricular activities to
            help students grow academically and socially.
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
            Visit Website
          </a>
        </div>
        <div className="partner-image-container" style={{ width: "50%" }}>
          <div className="partner-image">
            <img src={Kongshavn} alt="Kongshavn Videregående Skole" />
            <p style={{ fontSize: "12px", color: "gray", textAlign: "center" }}>
              © [Your Name or Copyright Holder] - [Image Source Address]
            </p>
          </div>
        </div>
      </div>
      <br />
      <hr
        style={{ border: "1px solid rgba(234, 236, 238, 0.55)", width: "100%" }}
      />
      <br />
      <h1>Partner Schools in Berlin</h1>
      <div className="partner-block">
        <div className="partner-info" style={{ width: "50%" }}>
          <h2>Kongshavn Videregående Skole</h2>
          <br />
          <br />
          <p>
            Kongshavn Videregående Skole is a high school in Oslo, Norway, known
            for its diverse educational programs and vibrant student life. The
            school offers a range of courses and extracurricular activities to
            help students grow academically and socially.
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
            Visit Website
          </a>
        </div>
        <div className="partner-image-container" style={{ width: "50%" }}>
          <div className="partner-image">
            <img src={Kongshavn} alt="Kongshavn Videregående Skole" />
            <p style={{ fontSize: "12px", color: "gray", textAlign: "center" }}>
              © [Your Name or Copyright Holder] - [Image Source Address]
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
        <div className="partner-info" style={{ width: "50%" }}>
          <h2>Kongshavn Videregående Skole</h2>
          <br />
          <br />
          <p>
            Kongshavn Videregående Skole is a high school in Oslo, Norway, known
            for its diverse educational programs and vibrant student life. The
            school offers a range of courses and extracurricular activities to
            help students grow academically and socially.
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
            Visit Website
          </a>
        </div>
        <div className="partner-image-container" style={{ width: "50%" }}>
          <div className="partner-image">
            <img src={Kongshavn} alt="Kongshavn Videregående Skole" />
            <p style={{ fontSize: "12px", color: "gray", textAlign: "center" }}>
              © [Your Name or Copyright Holder] - [Image Source Address]
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
