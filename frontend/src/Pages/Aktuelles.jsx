import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing
import "../Styles/index.css";

const Aktuelles = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/news')
            .then(response => response.json())
            .then(data => setNews(data))
            .catch(error => console.error('Error fetching news:', error));
    }, []);

    return (
        <div>
            <h1>Latest News</h1>
            <ul>
                {news.map(post => (
                    <li key={post.id} style={styles.preview}>
                        {/* First image preview */}
                        {post.file_urls && (
                            <img 
                                src={`http://localhost:5000${post.file_urls.split(',')[0]}`} 
                                alt="News Preview" 
                                width="150px" 
                            />
                        )}

                        {/* Post title */}
                        <h2>{post.title_en}</h2>
                        
                        {/* Render first sentence preview */}
                        <p>{post.content_en.split('.')[0]}...</p>
                        
                        {/* Render the full content with HTML formatting */}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(post.content_en), // Sanitize the content
                            }}
                        />
                        
                        {/* Link to full news */}
                        <Link to={`/aktuelles/${post.id}`}>Read More</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    preview: {
        borderBottom: '1px solid #ddd',
        padding: '10px',
        marginBottom: '10px'
    }
};

export default Aktuelles;
