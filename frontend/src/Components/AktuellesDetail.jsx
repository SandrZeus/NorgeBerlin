import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing

const AktuellesDetail = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/news/${id}`)
            .then(response => response.json())
            .then(data => setNewsItem(data))
            .catch(error => console.error('Error fetching news:', error));
    }, [id]);

    if (!newsItem) {
        return <p>Loading...</p>;
    }

    // Determine which language to display
    const isEnglish = i18n.language === 'en';

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{isEnglish ? newsItem.title_en : newsItem.title_de}</h1>
            <p style={styles.date}>{t('publishedOn')}: {newsItem.created_at}</p>

            <div style={styles.content}>
                {/* Render the content with HTML formatting */}
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(isEnglish ? newsItem.content_en : newsItem.content_de),
                    }}
                />
            </div>

            {/* Show all images */}
            {newsItem.file_urls && (
                <div style={styles.imageContainer}>
                    {newsItem.file_urls.split(',').map((url, index) => (
                        <img key={index} src={`http://localhost:5000${url}`} alt="News" width="400px" />
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '20px' },
    title: { fontSize: '24px', fontWeight: 'bold' },
    date: { fontSize: '14px', color: 'gray' },
    content: { marginTop: '20px' },
    imageContainer: { marginTop: '10px' },
    button: { marginTop: '20px', padding: '10px', cursor: 'pointer' }
};

export default AktuellesDetail;
