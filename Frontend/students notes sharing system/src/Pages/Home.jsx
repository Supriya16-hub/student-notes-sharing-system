import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";

const Home = () => {

  const navigate = useNavigate();

  const [dbCourses, setDbCourses] = useState([]);

  const role = localStorage.getItem("role");

  const handleYearClick = (course, year) => {
    navigate(`/all-notes?course=${course}&year=${year}`);
  };

  const deleteCourse = async (id) => {

    if (!window.confirm("Delete this course?")) return;

    const fd = new FormData();
    fd.append("id", id);

    await fetch("http://localhost/notes-backend/courses/deleteCourse.php", {
      method: "POST",
      body: fd,
      credentials: "include"
    });

    setDbCourses(dbCourses.filter(c => c.id !== id));
  };

  useEffect(() => {

    fetch("http://localhost/notes-backend/courses/getCourses.php")
      .then(res => res.json())
      .then(data => setDbCourses(data));

  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-100 to-white">

      <Hero />

      <div className="text-center my-10 space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          <span className="text-blue-500">Select</span>{" "}
          <span className="text-pink-500">Your Course</span>
        </h1>

        <p className="text-gray-600 text-sm">
          Click on course image and choose year
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-20">

        {dbCourses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col items-center cursor-pointer bg-white p-3 rounded-2xl shadow-lg border-2 border-gray-300
            hover:border-blue-500 hover:shadow-xl hover:bg-blue-50 hover:scale-105 hover:-translate-y-1 transition-all duration-300"
          >

            <img
              src={`http://localhost/notes-backend/uploads/${course.image}`}
              alt={course.name}
              className="w-32 h-32 object-cover rounded-xl"
            />

            <p className="mt-2 font-semibold">{course.name}</p>

            <div className="flex gap-2 mt-2">
              {["FY", "SY", "TY"].map((year) => (
                <button
                  key={year}
                  className="px-2 py-1 text-sm rounded-full font-medium border border-black bg-white/20 text-black
                  hover:bg-black hover:text-white transition-all duration-300"
                  onClick={() => handleYearClick(course.name, year)}
                >
                  {year}
                </button>
              ))}
            </div>

            {role === "admin" && (
              <button
                onClick={() => deleteCourse(course.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            )}

          </div>
        ))}

      </div>

      <Footer />

    </div>
  );
};

export default Home;