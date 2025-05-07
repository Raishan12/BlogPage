import React, { useState, useEffect } from 'react';
import './Uploadblog.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Uploadblog = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const userId = localStorage.getItem("id");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.image) {
      return alert("Please fill all fields and upload an image.");
    }

    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("content", formData.content); // was 'description'
    uploadData.append("image", formData.image);
    uploadData.append("user", userId); // was 'id'

    try {
      const res = await axios.post("http://localhost:5000/api/blog/uploaddata", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log(res.data);
      alert("Blog uploaded successfully!");
      navigate("/")
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="write-page">
      <div className="form-wrapper">
        <h2 className="title">Write Your Blog</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label className="label" htmlFor="title">Post Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="input"
              placeholder="Enter your blog title"
              required
            />
          </div>

          <div className="input-group">
            <label className="label" htmlFor="content">Tell Your Story</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="textarea"
              placeholder="Start writing your story..."
              required
            />
          </div>

          <div className="image-upload-container">
            <label htmlFor="image" className="label">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                <div className="image-placeholder">Upload Blog Image</div>
              )}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>

          <button type="submit" className="button">Publish</button>
        </form>
      </div>
    </div>
  );
};

export default Uploadblog;
