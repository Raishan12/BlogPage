import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import './Profile.css'

const Profile = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem("token")
  const id = localStorage.getItem("id")
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!token) {
      navigate('/login')
    } else {
      const loadUser = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setUser(res.data)
        } catch (error) {
          console.error("Failed to fetch user data:", error)
        }
      }
      loadUser()
    }
  }, [token, id, navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    navigate('/login')
  }

  if (!user) return <div className="loading">Loading...</div>

  return (
    <div className="profile-layout">
      <aside className="sidebar">
        <h2>{user.username}</h2>
        <nav className="sidebar-nav">
          <Link to="blogs" className={location.pathname.endsWith('blogs') ? 'active' : ''}>Show Blogs</Link>
          <Link to="upload" className={location.pathname.endsWith('upload') ? 'active' : ''}>Upload Blog</Link>
          <Link to="edit" className={location.pathname.endsWith('edit') ? 'active' : ''}>Edit Profile</Link>
          <Link to="/" className={location.pathname.endsWith('/') ? 'active' : ''}>Home</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </aside>
      <main className="profile-main">
        <Outlet />
      </main>
    </div>
  )
}

export default Profile
