import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import "../Styles/Sidebar.css";

const Sidebar = () => {
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/news?limit=4") // Fetch latest 3 news
      .then((res) => res.json())
      .then((data) => setLatestNews(data))
      .catch((error) => console.error("Error fetching latest news:", error));
  }, []);

  return (
    <div className="sidebar">
      <div className="follow-us">
        <h3>Follow Us</h3>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <FaFacebookF size={20} /> Facebook
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={20} /> Instagram
        </a>
      </div>

      <div className="latest-news">
        <h3>Latest News</h3>
        <ul>
          {latestNews.map((news, index) => (
            <li key={index}>
              <a href={`/aktuelles/${news.slug}`}>{news.title_en}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="advertisement">
        <h3>Advertisement</h3>
        <img src="/path-to-advert.jpg" alt="Ad" />
      </div>
    </div>
  );
};

export default Sidebar;
