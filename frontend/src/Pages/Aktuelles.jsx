import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../Styles/index.css";
import "../Styles/Aktuelles.css";
import Sidebar from "../Components/Sidebar";

const Aktuelles = () => {
  const [news, setNews] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setNews(sortedData);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const getRandomArticles = (articles, count = 4) => {
    return [...articles].sort(() => 0.5 - Math.random()).slice(0, count);
  };

  return (
    <div className="page">
      <br />
      <br />
      <br />
      <div className="carousel-container">
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          navigation
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          loop
        >
          {getRandomArticles(news).map((post) => (
            <SwiperSlide key={post.id}>
              <Link to={`/aktuelles/${post.slug}`} className="carousel-slide">
                {post.file_urls && (
                  <img
                    src={`http://localhost:5000${post.file_urls.split(",")[0]}`}
                    alt="News Preview"
                    className="carousel-image"
                  />
                )}
                <div className="carousel-overlay">
                  <h2 className="carousel-title">
                    {i18n.language === "en" ? post.title_en : post.title_de}
                  </h2>
                  <p className="carousel-date">
                    {new Date(post.created_at).toLocaleDateString(
                      i18n.language === "en" ? "en-GB" : "de-DE",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <br />
      <h1>{t("AktuellesTitle")}</h1>
      <br />
      <hr
        style={{ border: "1px solid rgba(234, 236, 238, 0.55)", width: "100%" }}
      />
      <br />
      <div className="content-wrapper">
        <div className="aktuelles-list">
          {news.map((post) => (
            <Link
              to={`/aktuelles/${post.slug}`}
              key={post.id}
              className="aktuelles-item"
            >
              {post.file_urls && (
                <img
                  src={`http://localhost:5000${post.file_urls.split(",")[0]}`}
                  alt="aktuelles Preview"
                  className="aktuelles-image"
                />
              )}
              <div className="aktuelles-content">
                <p className="aktuelles-date">
                  {new Date(post.created_at).toLocaleDateString(
                    i18n.language === "en" ? "en-GB" : "de-DE",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
                <h2 className="aktuelles-title">
                  {i18n.language === "en" ? post.title_en : post.title_de}
                </h2>
                <br />
                <p className="aktuelles-text">
                  {i18n.language === "en"
                    ? `${stripHtml(post.content_en).split(".")[0]}...`
                    : `${stripHtml(post.content_de).split(".")[0]}...`}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Sidebar />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Aktuelles;