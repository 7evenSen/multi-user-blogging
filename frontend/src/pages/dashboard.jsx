import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Posts</h2>
      {posts.length === 0 ? <p>No posts yet</p> : null}
      {posts.map((post) => (
        <div key={post._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;