import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaEnvelope } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import "../Styles/AktuellesDetail.css";

const AktuellesDetail = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/news/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched news item:", data); // Log the fetched item
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
  const showFirstImage = newsItem.show_first_image; // Boolean value
  const galleryLayout = newsItem.gallery_layout || "grid"; // Default to 'grid'

  return (
    <div className="page">
      {/* Full-width image */}
      {images.length > 0 && (
        <div className="news-featured-image">
          <img src={`http://localhost:5000${images[0]}`} alt="Featured" />
          <div className="overlay">
            <div className="title-date">
              <h2 className="news-title">{title}</h2>
              <p className="news-date">{t("publishedOn")}: {newsItem.created_at}</p>
            </div>
            <div className="news-share">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                <FaFacebookF size={20} />
              </a>
              <a href={`https://www.instagram.com/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                <FaInstagram size={20} />
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn size={20} />
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                <FaTwitter size={20} />
              </a>
              <a href={`mailto:?subject=${title}&body=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="news-content-wrapper">
        <div className="news-content">
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />

          {images.length > 0 && (
            <div className={`news-gallery ${galleryLayout}`}>
              {images.map((url, index) => {
                // Logic to determine if the first image should be displayed based on showFirstImage
                if (index === 0) {
                  return showFirstImage ? null : (
                    <img key={index} src={`http://localhost:5000${url}`} alt={`Gallery ${index + 1}`} />
                  );
                }
                // For the rest of the images, display them regardless
                return (
                  <img key={index} src={`http://localhost:5000${url}`} alt={`Gallery ${index + 1}`} />
                );
              })}
            </div>
          )}
        </div>

        <Sidebar />
      </div>
    </div>
  );
};

export default AktuellesDetail;