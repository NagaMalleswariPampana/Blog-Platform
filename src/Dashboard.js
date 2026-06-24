
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [stats, setStats] = useState({ total: 0, likes: 0, comments: 0 });
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/blogs');
                const myBlogs = res.data.filter(blog => blog.author === user?.name);
                setBlogs(myBlogs);

                const totalLikes = myBlogs.reduce((acc, blog) => acc + blog.likes, 0);
                const totalComments = myBlogs.reduce((acc, blog) => acc + blog.comments.length, 0);
                setStats({ total: myBlogs.length, likes: totalLikes, comments: totalComments });
            } catch (err) {
                console.log('Error fetching blogs');
            }
        };
        if (user?.name) fetchBlogs();
    }, [user?.name]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Welcome back, {user?.name || 'User'} 👋</h1>
                    <p className="text-gray-600 mt-2">Here's your Blogify dashboard</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-500 hover:scale-105 transition duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Blogs</p>
                                <p className="text-4xl font-bold text-gray-800 mt-1">{stats.total}</p>
                            </div>
                            <div className="text-5xl">📝</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-pink-500 hover:scale-105 transition duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Likes</p>
                                <p className="text-4xl font-bold text-gray-800 mt-1">{stats.likes}</p>
                            </div>
                            <div className="text-5xl">❤️</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-green-500 hover:scale-105 transition duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Comments</p>
                                <p className="text-4xl font-bold text-gray-800 mt-1">{stats.comments}</p>
                            </div>
                            <div className="text-5xl">💬</div>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <Link to="/write" className="inline-block mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 transform hover:scale-105">
                    + Create New Blog
                </Link>

                {/* Recent Blogs */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Recent Blogs</h2>
                    {blogs.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-7xl mb-4">✍️</p>
                            <p className="text-gray-500 text-lg">No blogs yet. Start writing your first blog!</p>
                            <Link to="/write" className="inline-block mt-4 text-indigo-600 font-semibold hover:underline">
                                Write Now →
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.slice(0, 6).map(blog => (
                                <div key={blog._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition duration-300">
                                    {blog.image ? (
                                        <img src={`http://localhost:5000/${blog.image}`} alt="blog" className="w-full h-48 object-cover" />
                                    ) : (
                                        <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-6xl">
                                            📄
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <h3 className="font-bold text-xl text-gray-800 truncate mb-2">{blog.title}</h3>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{blog.content}</p>
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>❤️ {blog.likes}</span>
                                            <span>💬 {blog.comments.length}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;