import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CreateNewsForm from '../Components/CreateNews.jsx';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitization

const Dashboard = ({ token, setToken }) => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const { i18n } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            fetchNews();
        }
    }, [token, navigate]);

    const fetchNews = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/news', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const news = await response.json();
            setPosts(news);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleLogout = () => {
        setToken(null);
        navigate('/login');
    };

    const handleDelete = async (id) => {
        const confirmation = window.confirm('Are you sure you want to delete this post?');
        if (confirmation) {
            try {
                const response = await fetch(`http://localhost:5000/api/news/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    alert('Post deleted successfully!');
                    fetchNews();
                } else {
                    alert('Error deleting post');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    const handleEdit = (post) => {
        setEditingPost(post);
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/news/${editingPost.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title_en: editingPost.title_en,
                    content_en: editingPost.content_en,
                    title_de: editingPost.title_de,
                    content_de: editingPost.content_de,
                }),
            });

            if (response.ok) {
                alert('Post updated successfully!');
                setEditingPost(null);
                fetchNews();
            } else {
                alert('Error updating post');
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <div className="dashboard-wrapper">
            <h1>Welcome to your Dashboard</h1>
            <button onClick={handleLogout}>Log Out</button>

            <h2>Create a News Post</h2>
            <CreateNewsForm refreshPosts={fetchNews} />

            <h2>Your Blog Posts</h2>
            <ul>
                {posts.length === 0 ? (
                    <p>No posts available.</p>
                ) : (
                    posts.map(post => (
                        <li key={post.id}>
                            <h3>{post.title_en}</h3>
                            {/* Render the content with HTML formatting */}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(post.content_en),
                                }}
                            />
                            
                            {/* Display uploaded files */}
                            {post.file_urls && post.file_types && post.positions && (
                                post.file_urls.split(',').map((url, index) => {
                                    const type = post.file_types.split(',')[index].trim();
                                    return type === 'image' ? (
                                        <img key={index} src={`http://localhost:5000${url}`} alt="News" width="200px" />
                                    ) : (
                                        <p key={index}>
                                            <a href={`http://localhost:5000${url}`} target="_blank" rel="noopener noreferrer">
                                                Download Attachment {index + 1}
                                            </a>
                                        </p>
                                    );
                                })
                            )}

                            <br />
                            <button onClick={() => handleEdit(post)}>Edit</button>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </li>
                    ))
                )}
            </ul>

            {editingPost && (
                <div>
                    <h2>Edit Post</h2>
                    <form onSubmit={handleSubmitEdit}>
                        <label>Title (English)</label>
                        <input
                            type="text"
                            value={editingPost.title_en}
                            onChange={(e) => setEditingPost({ ...editingPost, title_en: e.target.value })}
                            required
                        />
                        <label>Content (English)</label>
                        <textarea
                            value={editingPost.content_en}
                            onChange={(e) => setEditingPost({ ...editingPost, content_en: e.target.value })}
                            required
                        />
                        
                        <label>Title (German)</label>
                        <input
                            type="text"
                            value={editingPost.title_de}
                            onChange={(e) => setEditingPost({ ...editingPost, title_de: e.target.value })}
                            required
                        />
                        <label>Content (German)</label>
                        <textarea
                            value={editingPost.content_de}
                            onChange={(e) => setEditingPost({ ...editingPost, content_de: e.target.value })}
                            required
                        />
                        
                        <button type="submit">Update Post</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
