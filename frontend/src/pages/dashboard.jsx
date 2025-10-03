import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("/auth/me");
        setUser(userRes.data.user);

        const postsRes = await api.get("/posts");
        setPosts(postsRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Logged in as: {user.username}</p>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/createpost">Create Post</Link>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>
              By: {post.author?.username} | {new Date(post.createdAt).toLocaleString()}
            </p>
            {user.id === post.author?._id && (
              <>
                <Link to={`/editpost/${post._id}`}>Edit</Link>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}