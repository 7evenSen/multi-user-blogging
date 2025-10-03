import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      navigate("/dashboard");
    } else {
      alert("Failed to create post");
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <textarea name="content" placeholder="Content" onChange={handleChange}></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreatePost;