import React from 'react'

const AboutIntroduction = () => {
    return (
        <section className="relative mt-20 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg shadow-lg">
          {/* Background Decorative Overlay */}
          <div className="absolute inset-0 bg-opacity-50 bg-pattern bg-fixed opacity-20"></div>
    
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white dark:text-gray-100 mb-6 text-center drop-shadow-lg">
              Who We Are
            </h2>
    
            <p className="text-lg text-gray-100 dark:text-gray-300 mb-4 leading-relaxed text-center">
              Welcome to <span className="font-extrabold text-yellow-300 dark:text-yellow-400">LearnMaster</span>, 
              your trusted partner for online learning. Our platform offers a wide 
              variety of high-quality courses designed to help learners of all levels 
              acquire new skills and advance their careers.
            </p>
    
            <p className="text-lg text-gray-100 dark:text-gray-300 mb-4 leading-relaxed text-center">
              Whether you're a student looking to enhance your academic knowledge or 
              a professional aiming to stay competitive, we have the resources to help 
              you achieve your goals. Learn from industry experts and access courses 
              24/7, on your terms.
            </p>
    
            <p className="text-lg text-gray-100 dark:text-gray-300 mb-6 leading-relaxed text-center">
              Join a community of passionate learners and unlock your full potential with 
              <span className="font-extrabold text-yellow-300 dark:text-yellow-400"> LearnMaster</span>.
            </p>
    
            {/* Call to Action */}
            <div className="text-center">
              <a
                href="/courses"
                className="inline-block bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-600 text-indigo-900 dark:text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Explore Courses
              </a>
            </div>
          </div>
        </section>
      );
}

export default AboutIntroduction