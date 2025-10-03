import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Create Post Button */}
      <Link to="/createpost">
        <button style={{ marginBottom: "1rem" }}>+ Create New Post</button>
      </Link>

      {/* Posts List */}
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>
                <small>
                  Author: {post.author?.username || "Unknown"} |{" "}
                  {new Date(post.createdAt).toLocaleString()}
                </small>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}