import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import Slider from "react-slick";
import Sidebar from "../Components/Sidebar";
import "../Styles/AktuellesDetail.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AktuellesDetail = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [newsItem, setNewsItem] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/news/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched news item:", data);
        setNewsItem(data);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, [slug]);

  if (!newsItem) {
    return <p>Loading...</p>;
  }

  const isEnglish = i18n.language === "en";
  const content = isEnglish ? newsItem.content_en : newsItem.content_de;
  const title = isEnglish ? newsItem.title_en : newsItem.title_de;
  const images = newsItem.file_urls ? newsItem.file_urls.split(",") : [];
  const showFirstImage = newsItem.show_first_image;
  const galleryLayout = newsItem.gallery_layout || "grid";

  const formattedDate = new Date(newsItem.created_at).toLocaleDateString(
    i18n.language === "de" ? "de-DE" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const settings = {
    centerMode: true,
    centerPadding: "200px",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "0px",
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="page">
      {images.length > 0 && (
        <div className="news-featured-image">
          <img
            src={`http://localhost:5000${images[0]}`}
            alt="Featured"
            onClick={() => openModal(`http://localhost:5000${images[0]}`)}
          />
          <div className="overlay">
            <div className="title-date">
              <h2 className="news-title">{title}</h2>
              <p className="news-date">{formattedDate}</p>
            </div>
            <div className="news-share">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href={`https://www.instagram.com/?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href={`mailto:?subject=${title}&body=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="news-content-wrapper">
        <div className="news-content">
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          />

          {images.length > 1 && galleryLayout === "carousel" ? (
            <Slider {...settings} className="news-gallery">
              {images.map((url, index) => {
                if (index === 0 && !showFirstImage) return null;
                return (
                  <div key={index}>
                    <img
                      src={`http://localhost:5000${url}`}
                      alt={`Gallery ${index + 1}`}
                      onClick={() => openModal(`http://localhost:5000${url}`)}
                    />
                  </div>
                );
              })}
            </Slider>
          ) : (
            <div className={`news-gallery ${galleryLayout}`}>
              {images.map((url, index) => {
                if (index === 0 && !showFirstImage) return null;
                return (
                  <img
                    key={index}
                    src={`http://localhost:5000${url}`}
                    alt={`Gallery ${index + 1}`}
                    onClick={() => openModal(`http://localhost:5000${url}`)}
                  />
                );
              })}
            </div>
          )}
        </div>

        <Sidebar />
      </div>

      {modalImage && (
        <div className="image-modal active" onClick={closeModal}>
          <span className="close-btn">&times;</span>
          <img src={modalImage} alt="Enlarged" />
        </div>
      )}
    </div>
  );
};

export default AktuellesDetail;