import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/blogs')
            .then(res => setBlogs(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="page-container">
            <div className="hero-section">
                <h1>Welcome to Blogify</h1>
                <p>Share your stories with the world</p>
            </div>

            <h2 style={{ color: 'white', marginBottom: '30px', fontSize: '32px' }}>Latest Blogs</h2>

            {blogs.length === 0 ? (
                <div className="empty-state">
                    <h3>No blogs yet</h3>
                    <p>Be the first to create a blog!</p>
                </div>
            ) : (
                <div className="blog-grid">
                    {blogs.map(blog => (
                        <div key={blog._id} className="blog-card">
                            <h3>{blog.title}</h3>
                            <p>{blog.content.substring(0, 150)}...</p>
                            <div className="blog-meta">
                                <span>By {blog.author?.name || 'Anonymous'}</span>
                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;