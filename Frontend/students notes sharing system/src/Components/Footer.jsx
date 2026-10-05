import React from "react";
import { FaLinkedin, FaGithub, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 mt-10">
      <h2 className="text-center text-2xl font-bold mb-6">Developed By</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">

        {/* Developer 1 */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-lg hover:bg-gray-700 transition">
          <h3 className="text-xl font-semibold mb-2">Madhavi Dinde</h3>
          <p className="flex items-center gap-2"><FaPhone /> +91 9309724232</p>
          <p className="flex items-center gap-2"><MdEmail /> madhavidinde9@gmail.com</p>

          <div className="flex gap-4 mt-3 text-xl">
            <a
              href="https://www.linkedin.com/in/madhavi-dinde"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/madhavidinde"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Developer 2 */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-lg hover:bg-gray-700 transition">
          <h3 className="text-xl font-semibold mb-2">Sakhare Supriya</h3>
          <p className="flex items-center gap-2"><FaPhone /> +91 9657399050</p>
          <p className="flex items-center gap-2"><MdEmail /> priyasakhare834@gmail.com</p>

          <div className="flex gap-4 mt-3 text-xl"> 
            <a
              href="https://www.linkedin.com/in/supriya-sakhare"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/supriyasakhare"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Developer 3 */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-lg hover:bg-gray-700 transition">
          <h3 className="text-xl font-semibold mb-2">Patil Yogita</h3>
          <p className="flex items-center gap-2"><FaPhone /> +91 7499749505</p>
          <p className="flex items-center gap-2"><MdEmail /> yogitapatil749974@gmail.com</p>

          <div className="flex gap-4 mt-3 text-xl">
            <a
              href="https://www.linkedin.com/in/yogita-patil"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/yogitapatil"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>

      </div>

      <p className="text-center text-gray-400 mt-6">
        © 2026 Study Notes Project — All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
