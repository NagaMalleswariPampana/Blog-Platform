jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/blogs', { title, content, userEmail });
            navigate('/dashboard');
        } catch (err) {
            alert('Blog save avvatledu');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Create Blog</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                /><br />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    style={{ width: '100%', height: '200px', padding: '10px', marginBottom: '10px' }}
                ></textarea><br />
                <button type="submit" style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Post Blog
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;