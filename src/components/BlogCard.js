import React from 'react';

function BlogCard({ blog }) {
    return (
        <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            margin: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
            <h3>{blog?.title || 'No Title'}</h3>
            <p>{blog?.content || 'No Content'}</p>
            <small>By {blog?.author?.name || 'Anonymous'}</small>
        </div>
    );
}

export default BlogCard;