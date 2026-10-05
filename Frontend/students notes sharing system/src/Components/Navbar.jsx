import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const isLoggedIn = localStorage.getItem("loggedInUser");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("loggedInUser"); // ADDED

  const handleLogout = async () => {
    try {
      await fetch("http://localhost/notes-backend/users/logout.php", {
        method: "POST", 
        credentials: "include",
      });

      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("role");

      navigate("/login");
      window.location.reload(); 
    } catch {
      alert("Logout failed");
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/all-notes?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-blue-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center">
            <h1
              className="text-white text-xl font-bold flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              📒 <span className="hidden sm:inline">Notes</span>
            </h1>
          </div>

          <div className="hidden md:flex space-x-6 text-white font-medium items-center">

            <Link to="/" className="hover:text-yellow-300 transition">
              Home
            </Link>

            <Link to="/all-notes" className="hover:text-yellow-300 transition">
              All Notes
            </Link>

            {role === "admin" && (
              <Link to="/upload" className="hover:text-yellow-300 transition">
                Upload
              </Link>
            )}
            {role === "admin" && (
  <Link to="/add-course" className="hover:text-yellow-300 transition">
    Add Course
  </Link>
)}

            <button
              onClick={() => navigate("/about")}
              className="px-3 py-1 bg-purple-500 text-white rounded-lg"
            >
              ℹ️ About Web
            </button>

           

            {!isLoggedIn ? (
              <button
                onClick={() => navigate("/login")}
                className="ml-4 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-4 py-1 rounded-full transition"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded-full transition"
              >
                Logout
              </button>
             
            )}
                {/* ADDED USERNAME SHOW */}
            {isLoggedIn && (
              <span className="ml-4 bg-white text-black px-3 py-1 rounded-full font-semibold">
                Welcome {username}
              </span>
            )}
          </div>

          <div className="md:hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/all-notes">All Notes</Link>
            {role === "admin" && <Link to="/upload">Upload</Link>}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;