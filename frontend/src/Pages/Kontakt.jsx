import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import "../Styles/index.css";
import "../Styles/Kontakt.css";

const Kontakt = () => {
  
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    regard: "",
    message: "",
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptcha = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!captchaVerified) {
      validationErrors.captcha = "Please verify you are not a robot";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    alert("Form submitted successfully!");
    setFormData({ name: "", email: "", regard: "", message: "" });
    setCaptchaVerified(false);
  };

  return (
    <div className="page">
      <br />
      <br />
      <br />
      <br />
      <h1>{t("kontakt")}</h1>
      <br />
      <h2>{t("KontaktTitle")}</h2>
      <br />
      <p
        dangerouslySetInnerHTML={{
          __html: t("KontaktText").replace(/\n/g, "<br/>"),
        }}
      ></p>
      <br />
      <hr
        style={{ border: "1px solid rgba(234, 236, 238, 0.55)", width: "100%" }}
      />
      <br />
      <form onSubmit={handleSubmit} className="kontakt-form">
        <label style={{ color: "gray", fontStyle: "italic", fontSize: "16px" }}>
          Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label style={{ color: "gray", fontStyle: "italic", fontSize: "16px" }}>
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label style={{ color: "gray", fontStyle: "italic", fontSize: "16px" }}>
          {t("KontaktBetreff")}
        </label>
        <input
          type="text"
          name="regard"
          value={formData.regard}
          onChange={handleChange}
        />

        <label style={{ color: "gray", fontStyle: "italic", fontSize: "16px" }}>
          {t("KontaktNachricht")}
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
        />

        <ReCAPTCHA
          sitekey="6Ld_hN8qAAAAAAIscOatSAN4KwL1vMuVsgaZqG0a"
          onChange={handleCaptcha}
        />
        {errors.captcha && <p className="error">{errors.captcha}</p>}
        <button className="kontakt-button" type="submit">
          {t("KontaktSenden")}
        </button>
      </form>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Kontakt;