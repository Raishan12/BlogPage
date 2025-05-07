import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Editprofile.css"

const Editprofile = () => {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('id')

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    photo: null,
  })

  const [preview, setPreview] = useState(null)

  // Load current user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blog/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setFormData({
          username: res.data.username,
          email: res.data.email,
          photo: null,
        })
        setPreview(`http://localhost:5000/images/${res.data.photo}`)
      } catch (error) {
        console.error('Failed to load user data:', error)
      }
    }

    fetchUser()
  }, [token, userId])

  const handleChange = e => {
    const { name, value, files } = e.target
    if (name === 'photo') {
      const file = files[0]
      setFormData(prev => ({ ...prev, photo: file }))
      setPreview(URL.createObjectURL(file))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const data = new FormData()
    data.append('username', formData.username)
    data.append('email', formData.email)
    if (formData.photo) data.append('photo', formData.photo)

    try {
      await axios.post(`http://localhost:5000/api/blog/edit/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      alert('Profile updated successfully')
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert('Update failed')
    }
  }

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Profile Photo:</label>
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />
        </div>
        {preview && (
          <div style={{ marginTop: '10px' }}>
            <img src={preview} alt="Preview" style={{ width: '150px', borderRadius: '8px' }} />
          </div>
        )}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  )
}

export default Editprofile
