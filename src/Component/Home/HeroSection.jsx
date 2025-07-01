import React from 'react'



const HeroSection = () => {
  return (
    <div
      className="relative   bg-gray-200 dark:bg-gray-800"
      style={{
        backgroundImage: `url(./background.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute  inset-0 bg-black opacity-50"></div>
      <div className="container  mx-auto flex flex-col items-center justify-center h-screen relative z-10 text-white">
        <h1 className="text-5xl font-bold mb-4 text-center">
          Unlock Your Potential with MindUp Learning
        </h1>
        <p className="text-lg mb-8 text-center">
          Access expert courses anytime, anywhere, and accelerate your
          personal and professional growth.
        </p>
        <div className="flex space-x-4">
          <a
            href="#courses"
            className="inline-block bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-600 text-indigo-900 dark:text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Start Learning Now
          </a>
          <a
            href="#about"
            className="border border-white text-white py-3 px-6 rounded-lg hover:bg-white hover:text-indigo-600 transition duration-300"
          >
            Browse Courses
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroSection