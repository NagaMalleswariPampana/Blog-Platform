import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('Please login first');
            navigate('/login');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('author', user.name);
        if (image) formData.append('image', image);

        try {
            await axios.post('http://localhost:5000/api/blogs', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Blog Created Successfully! 🎉');
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
            alert('Error creating blog. Check if backend is running.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Create New Blog ✍️</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Blog Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="Enter your blog title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg h-48 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                            placeholder="Write your blog content here..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Cover Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                    >
                        Publish Blog 🚀
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;