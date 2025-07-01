import React from 'react'
import { FaChalkboardTeacher, FaLaptopCode, FaCertificate, FaGlobe, FaUserGraduate, FaBookOpen } from 'react-icons/fa';


const KeyFeatures = () => {
    const features = [
        {
          title: "Expert Instructors",
          description: "Learn from industry experts with real-world experience in their fields.",
          icon: <FaChalkboardTeacher className="text-indigo-600 dark:text-yellow-400 w-12 h-12" />,
        },
        {
          title: "Flexible Learning",
          description: "Access courses anytime, anywhere with self-paced online learning.",
          icon: <FaLaptopCode className="text-indigo-600 dark:text-yellow-400 w-12 h-12" />,
        },
        {
          title: "Certified Programs",
          description: "Earn certifications that are recognized by top employers worldwide.",
          icon: <FaCertificate className="text-indigo-600 dark:text-yellow-400 w-12 h-12" />,
        },
        {
          title: "Global Community",
          description: "Join a community of learners from all over the world, collaborating and growing together.",
          icon: <FaGlobe className="text-indigo-600 dark:text-yellow-400 w-12 h-12" />,
        },
        {
          title: "Career Advancement",
          description: "Enhance your skills and advance your career with courses designed for professional growth.",
          icon: <FaUserGraduate className="text-indigo-600 dark:text-yellow-400 w-12 h-12" />,
        },
        {
          title: "Extensive Resources",
          description: "Get access to a wide range of resources, including reading materials and projects.",
          icon: <FaBookOpen className="text-indigo-600 dark:text-yellow-400 w-12 h-12" />,
        },
      ];
    
      return (
        <section className="py-16 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Key Features</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Discover the unique benefits of using LearnMaster and enhance your learning experience.
              </p>
            </div>
    
            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-8 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 shadow-lg rounded-lg transition-transform transform hover:scale-105 text-center"
                >
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-indigo-600 dark:text-yellow-400 mb-4">{feature.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
}

export default KeyFeatures