

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AllNotes from "./Pages/allNotes";
import UploadNotes from "./Pages/UploadNotes.jsx";
import About from "./Pages/About.jsx";
import BuyNotes from "./Pages/BuyNotes.jsx";
import AddCourse from "./Pages/AddCourse";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-notes" element={<AllNotes />} />
        <Route path="/upload" element={<UploadNotes />} />
        <Route path="/about" element={<About />} />
        <Route path="/buy/:id" element={<BuyNotes />} />
        <Route path="/add-course" element={<AddCourse />} />
        
      </Routes>
    </Router>
  );
};

export default App;