import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/posts", { title, content });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Create post failed");
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content"></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}