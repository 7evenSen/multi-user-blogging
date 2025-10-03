import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // get user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);

    getPosts()
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      setPosts(posts.filter((p) => p._id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {currentUser ? (
        <p>
          Logged in as: <strong>{currentUser.username}</strong> (
          {currentUser.email})
        </p>
      ) : (
        <p>Loading user info...</p>
      )}

      <Link to="/create">Create New Post</Link>
      <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
        Logout
      </button>

      <div style={{ marginTop: "20px" }}>
        {posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>
              <strong>Author:</strong> {post.author?.username || "Unknown"}
            </p>
            <p>
              <strong>Posted on:</strong>{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>

            {/* show edit/delete only for the author */}
            {currentUser && post.author?._id === currentUser.id && (
              <>
                <Link to={`/edit/${post._id}`} style={{ marginRight: "10px" }}>
                  Edit
                </Link>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}