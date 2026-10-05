import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          📘 About This Website
        </h1>

        <p className="text-gray-700 mb-4">
          This website is a study notes sharing platform where students can
          easily access notes according to their course and academic year.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">📚 Features</h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Students can select course like BCA, BSE, BCS etc.</li>
          <li>Notes available for FY, SY and TY</li>
          <li>Admin can upload notes in PDF format</li>
          <li>Students can download notes easily</li>
          <li>Simple and user friendly interface</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          💻 Technologies Used
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>React JS (Frontend)</li>
          <li>Tailwind CSS (UI)</li>
          <li>PHP (Backend)</li>
          <li>MySQL Database</li>
          <li>XAMPP Server</li>
        </ul>

        <p className="text-center text-gray-600 mt-6">
          Our goal is to help students easily access study materials anytime.
        </p>

      </div>
    </div>
  );
};

export default About;