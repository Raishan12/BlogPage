import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Userblog.css"

const Userblog = () => {
  const [blogs, setBlogs] = useState([])
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('id')

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blog/getdata', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        // Filter blogs by user ID
        const userBlogs = response.data.filter(blog => blog.user._id === userId)
        setBlogs(userBlogs)
      } catch (error) {
        console.error('Failed to load user blogs:', error)
      }
    }

    fetchUserBlogs()
  }, [token, userId])

  return (
    <div>
      <h2>My Blogs</h2>
      {blogs.length === 0 ? (
        <p>You haven't posted any blogs yet.</p>
      ) : (
        <div className="user-blogs">
          {blogs.map(blog => (
            <div key={blog._id} className="user-blog-card">
              <h3>{blog.title}</h3>
              <p>{blog.content.substring(0, 100)}...</p>
              {blog.photo && (
                <img
                  src={`http://localhost:5000/images/${blog.photo}`}
                  alt={blog.title}
                  style={{ width: '100%', maxWidth: '400px', borderRadius: '8px', marginTop: '10px' }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Userblog
