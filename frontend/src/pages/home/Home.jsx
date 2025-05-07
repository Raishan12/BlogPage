import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("id");

  const [blogs, setBlogs] = useState([]);

  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog/getdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Filter out blogs from current user
      const filteredBlogs = res.data.filter(blog => blog.user._id !== currentUserId);
      setBlogs(filteredBlogs);
    } catch (error) {
      console.log("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      loadData();
    }
  }, [token, navigate]);

  return (
    <div className="home container">
      <h1 className="home-title">Latest Blogs</h1>
      <div className="blog-list">
        {blogs.length === 0 ? (
          <p>No blogs available</p>
        ) : (
          blogs.map(blog => (
            <div className="blog-card" key={blog._id}>
              <img
                src={`http://localhost:5000/images/${blog.photo}`}
                alt="blog"
                className="blog-img"
              />
              <div className="blog-content">
                <div className="blog-user-info">
                  <img
                    src={`http://localhost:5000/images/${blog.user.photo}`}
                    alt="author"
                    className="blog-user-photo"
                  />
                  <span className="blog-username">{blog.user.username}</span>
                </div>
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-text">{blog.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
