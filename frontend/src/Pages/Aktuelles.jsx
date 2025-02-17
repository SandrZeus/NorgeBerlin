import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "../Styles/index.css";
import "../Styles/Aktuelles.css";

const Aktuelles = () => {
    const [news, setNews] = useState([]);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        fetch('http://localhost:5000/api/news')
            .then(response => response.json())
            .then(data => setNews(data))
            .catch(error => console.error('Error fetching news:', error));
    }, []);

    // Function to remove all HTML tags
    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    return (
        <div className="page">
            <div className="header">
                <h1>{t('latestNews')}</h1>
            </div>

            <div className="news-list">
                {news.map(post => (
                    <Link to={`/aktuelles/${post.id}`} key={post.id} className="news-item">
                        {post.file_urls && (
                            <img 
                                src={`http://localhost:5000${post.file_urls.split(',')[0]}`} 
                                alt="News Preview" 
                                className="news-image"
                            />
                        )}
                        <div className="news-content">
                            <h2 className="news-title">
                                {i18n.language === 'en' ? post.title_en : post.title_de}
                            </h2>
                            <p className="news-text">
                                {i18n.language === 'en' 
                                    ? `${stripHtml(post.content_en).split('.')[0]}...` 
                                    : `${stripHtml(post.content_de).split('.')[0]}...`
                                }
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Aktuelles;
