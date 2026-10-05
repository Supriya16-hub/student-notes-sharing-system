import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("loggedInUser");

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const course = params.get("course");
    const year = params.get("year");

    let url = "http://localhost/notes-backend/notes/getNotes.php";

    if (course && year) {
      url += `?course=${course}&year=${year}`;
    }

    fetch(url, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch(() => alert("Server error"));

  }, []);

  const handleDownload = async (noteId) => {

    if (!user) {
      navigate("/login");
      return;
    }

    // ⭐ CHANGE: direct download nahi, buy page open
    navigate(`/buy/${noteId}`);
  };

  const handleView = (noteId) => {
    window.open(
      `http://localhost/notes-backend/notes/view.php?id=${noteId}`,
      "_blank"
    );
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-6">All Notes</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">{note.subject}</h2>
            <p className="text-sm text-gray-500">
              {note.course} - {note.year}
            </p>

            <div className="flex gap-2 mt-3">

              <button
                onClick={() => handleDownload(note.id)}
                className="bg-pink-500 text-white px-3 py-1 text-sm rounded"
              >
                Download
              </button>

              <button
                onClick={() => handleView(note.id)}
                className="bg-red-800 text-white px-3 py-1 text-sm rounded"
              >
                View Notes
              </button>

            </div>

           
            <p className="text-sm text-gray-700 mt-2 font-bold">
              Price: ₹{note.price}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNotes;