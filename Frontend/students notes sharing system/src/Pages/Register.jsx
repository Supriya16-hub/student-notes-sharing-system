import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // ADDED
  const [dob, setDob] = useState(""); // ADDED
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost/notes-backend/users/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            email, // ADDED
            dob, // ADDED
            password
          }),
          credentials: "include"
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        alert("Registered successfully");
        navigate("/login");
      } else {
        alert(data.message);
      }

    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >

        <h2 className="text-2xl font-bold text-center">
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="border px-3 py-2 rounded w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          className="border px-3 py-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="date"
          className="border px-3 py-2 rounded w-full"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white py-2 rounded w-full hover:bg-green-700 transition">
          Register
        </button>

      </form>

    </div>
  );
};

export default Register;