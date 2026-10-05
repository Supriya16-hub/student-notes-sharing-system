import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full bg-gray-800 py-20">
    
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
          Students Notes Sharing System
        </h1>

        <p className="text-white/90 text-lg md:text-xl mb-10">
          One platform for all courses, semesters and subjects – simple, fast
          and free access to notes.
        </p>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="border border-white/20 rounded-lg px-4 py-6 text-white">
            <h3 className="text-xl font-semibold mb-2">📚 All Courses</h3>
            <p className="text-sm text-white/80">
              BCA, BSE, BBA & more
            </p>
          </div>

          <div className="border border-white/20 rounded-lg px-4 py-6 text-white">
            <h3 className="text-xl font-semibold mb-2">🎓 Semesters</h3>
            <p className="text-sm text-white/80">
              FY, SY & TY notes available
            </p>
          </div>

          <div className="border border-white/20 rounded-lg px-4 py-6 text-white">
            <h3 className="text-xl font-semibold mb-2">⬇ Easy Download</h3>
            <p className="text-sm text-white/80">
              Direct PDF access
            </p>
          </div>

  <div className="border border-white/20 rounded-lg px-4 py-6 text-white">
  <h3 className="text-xl font-semibold mb-2">🎓 Course Notes</h3>
  <p className="text-sm text-white/80">
    Notes by course & year
  </p>
</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
