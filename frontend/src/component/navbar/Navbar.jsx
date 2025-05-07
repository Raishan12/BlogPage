import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const profileRef = useRef(null)

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev)
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // You can replace this with actual image from user's data
  const profileImage = "https://i.pravatar.cc/40?img=5"  // example placeholder

  return (
    <div className='navbar container'>
      <div className="title"><h1>BLOG PAGE</h1></div>
      <div className="profile-section" ref={profileRef}>
        <img
          src={profileImage}
          alt="Profile"
          className="profile-pic"
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/profile/blogs">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
