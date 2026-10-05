import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadNotes = () => {
  const navigate = useNavigate();

  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState("");
  const [pdf, setPdf] = useState(null);
  const [notes, setNotes] = useState([]);
  const [courses, setCourses] = useState([]); 

  useEffect(() => {
    fetch("http://localhost/notes-backend/users/checkAdmin.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "admin") {
          navigate("/login");
        }
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  
  const loadCourses = async () => {
    try {
      const res = await fetch(
        "http://localhost/notes-backend/courses/getCourses.php"
      );
      const data = await res.json();
      setCourses(data);
    } catch {
      console.log("Course load error");
    }
  };

  const loadNotes = async () => {
    try {
      const res = await fetch(
        "http://localhost/notes-backend/notes/getNotes.php",
        { credentials: "include" }
      );
      const data = await res.json();
      setNotes(data);
    } catch {
      alert("Server error");
    }
  };

  useEffect(() => {
    loadNotes();
    loadCourses(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!course || !year || !subject || !pdf) {
      alert("All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("course", course);
    formData.append("year", year);
    formData.append("subject", subject);
    formData.append("price", price);
    formData.append("pdf", pdf);

    try {
      const res = await fetch(
        "http://localhost/notes-backend/notes/uploadNotes.php",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        alert("PDF Uploaded Successfully");
        setCourse("");
        setYear("");
        setSubject("");
        setPrice("");
        setPdf(null);
        loadNotes();
      } else {
        alert(data.message);
      }
    } catch {
      alert("Server error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    const fd = new FormData();
    fd.append("id", id);

    try {
      const res = await fetch(
        "http://localhost/notes-backend/notes/deleteNotes.php",
        {
          method: "POST",
          body: fd,
          credentials: "include",
        }
      );

      const data = await res.json();
      if (data.status === "success") {
        loadNotes();
      }
    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Upload Notes (Admin)</h2>

       
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Course</option>

          {courses.map((c) => (
            <option key={c.id}>{c.name}</option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Year</option>
          <option>FY</option>
          <option>SY</option>
          <option>TY</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Subject Name"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          className="w-full"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Upload PDF
        </button>
      </form>

      
      <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-3 gap-6">
        {notes.map((n) => (
          <div key={n.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{n.subject}</h3>

            <p className="text-sm text-gray-500">
              {n.course} - {n.year}
            </p>

            <button
              onClick={() => handleDelete(n.id)}
              className="text-red-600 text-sm mt-3"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadNotes;