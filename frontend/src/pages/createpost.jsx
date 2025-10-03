import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/posts", { title, content });
      alert("Post created successfully!");
      navigate("/dashboard"); // 👈 redirect to dashboard after success
    } catch (error) {
      alert("Failed to create post: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}