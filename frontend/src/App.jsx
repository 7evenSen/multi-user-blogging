import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Createpost from "./pages/createpost.jsx";

function App() {
  return (
    <div>
      <nav>
        <Link to="/signup">Signup</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link> |{" "}
        <Link to="/createpost">Create Post</Link>
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createpost" element={<Createpost />} />
      </Routes>
    </div>
  );
}

export default App;