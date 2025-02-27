import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../Styles/Sidebar.css";

const Sidebar = () => {
  const { i18n } = useTranslation();
  const [latestNews, setLatestNews] = useState([]);

  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/news?limit=4")
      .then((res) => res.json())
      .then((data) => setLatestNews(data))
      .catch((error) => console.error("Error fetching latest news:", error));

    const loadFacebookSDK = () => {
      if (window.FB) {
        window.FB.XFBML.parse();
      } else {
        const fbScript = document.createElement("script");
        fbScript.src =
          "https://connect.facebook.net/de_DE/sdk.js#xfbml=1&version=v8.0&appId=YOUR_APP_ID&autoLogAppEvents=1";
        fbScript.async = true;
        fbScript.defer = true;
        fbScript.onload = () => {
          window.FB.XFBML.parse();
        };
        document.body.appendChild(fbScript);
      }
    };

    loadFacebookSDK();

    const googleAdsScript = document.createElement("script");
    googleAdsScript.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    googleAdsScript.async = true;
    document.body.appendChild(googleAdsScript);

    const triggerGoogleAds = () => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    };

    const timeoutId = setTimeout(triggerGoogleAds, 500);

    return () => {
      document.body.removeChild(googleAdsScript);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="container">
        <h3>Follow Us on Facebook</h3>
        <hr
          style={{
            border: "1px solid rgba(234, 236, 238, 0.55)",
            width: "100%",
          }}
        />
        <br />
        <div className="facebook-plugin">
          <div id="fb-root"></div>
          <div
            className="fb-page"
            data-href="https://www.facebook.com/norgeberlin.de"
            data-tabs="timeline"
            data-width="280"
            data-height="600"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote
              cite="https://www.facebook.com/norgeberlin.de"
              className="fb-xfbml-parse-ignore"
            >
              <a href="https://www.facebook.com/norgeberlin.de">
                norgeberlin.de
              </a>
            </blockquote>
          </div>
        </div>
      </div>
      <div className="container">
        <h3>Latest News</h3>
        <hr
          style={{
            border: "1px solid rgba(234, 236, 238, 0.55)",
            width: "100%",
          }}
        />
        <br />
        <div className="sidebar-list">
          {latestNews.map((post) => (
            <Link
              to={`/aktuelles/${post.slug}`}
              key={post.id}
              className="sidebar-item"
            >
              {post.file_urls && (
                <img
                  src={`http://localhost:5000${post.file_urls.split(",")[0]}`}
                  alt="sidebar Preview"
                  className="sidebar-image"
                />
              )}
              <div className="sidebar-content">
                <p className="sidebar-date">
                  {new Date(post.created_at).toLocaleDateString(
                    i18n.language === "en" ? "en-GB" : "de-DE",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
                <h2 className="sidebar-title">
                  {i18n.language === "en" ? post.title_en : post.title_de}
                </h2>
                <p className="sidebar-text">
                  {i18n.language === "en"
                    ? `${stripHtml(post.content_en).split(".")[0]}...`
                    : `${stripHtml(post.content_de).split(".")[0]}...`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="container">
        <h3>Advertisement</h3>
        <hr
          style={{
            border: "1px solid rgba(234, 236, 238, 0.55)",
            width: "100%",
          }}
        />
        <br />
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-9741906885980697"
          data-ad-slot="5429703341"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
};

export default Sidebar;