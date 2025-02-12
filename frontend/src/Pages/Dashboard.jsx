import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CreateNewsForm from '../Components/CreateNews.jsx';

const Dashboard = ({ token, setToken }) => {
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null); // Track the post being edited
    const { i18n } = useTranslation();
    const navigate = useNavigate();

    // Fetch user data and posts when the component mounts
    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            const fetchData = async () => {
                try {
                    const userResponse = await fetch('http://localhost:5000/api/news', {
                        headers: { 'Authorization': `Bearer ${token}` },
                    });
                    const news = await userResponse.json();
                    setPosts(news);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [token, navigate]);

    // Function to refresh posts after creation, deletion, or edit
    const refreshPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/news', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const news = await response.json();
            setPosts(news);
        } catch (error) {
            console.error('Error refreshing posts:', error);
        }
    };

    const handleLogout = () => {
        setToken(null);
        navigate('/login');
    };

    // Handle editing a post
    const handleEdit = (post) => {
        setEditingPost(post); // Set the post to be edited
    };

    // Handle submitting the edited post
    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        const { title_en, content_en, title_de, content_de } = editingPost;

        try {
            const response = await fetch(`http://localhost:5000/api/news/${editingPost.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title_en, content_en, title_de, content_de }),
            });

            if (response.ok) {
                alert('Post updated successfully!');
                refreshPosts(); // Refresh posts after updating
                setEditingPost(null); // Close the edit form
            } else {
                alert('Error updating post');
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
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
                    refreshPosts(); // Refresh posts after deletion
                } else {
                    alert('Error deleting post');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    return (
        <div className="dashboard-wrapper">
            <h1>Welcome to your Dashboard</h1>
            
            {userData ? (
                <div>
                    <h2>Hello, {userData.username}</h2>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}

            {/* Newsletter form inside dashboard */}
            <h2>Create a News Post</h2>
            <CreateNewsForm refreshPosts={refreshPosts} />

            <h2>Your Blog Posts</h2>
            <ul>
                {posts.length === 0 ? (
                    <p>No posts available.</p>
                ) : (
                    posts.map(post => (
                        <li key={post.id}>
                            <h3>{i18n.language === 'de' ? post.title_de : post.title_en}</h3>
                            <p>{i18n.language === 'de' ? post.content_de : post.content_en}</p>

                            {/* Edit Button */}
                            <button onClick={() => handleEdit(post)}>Edit</button>
                            {/* Delete Button */}
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </li>
                    ))
                )}
            </ul>

            {/* Edit Form */}
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
