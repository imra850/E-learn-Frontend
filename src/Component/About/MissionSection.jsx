import React from 'react'

const MissionSection = () => {
    return (
        <section className="py-12 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            {/* Title Section */}
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Our Mission & Vision</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Empowering learners through innovative, accessible education.
              </p>
            </div>
    
            {/* Grid for Mission and Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="p-8 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 shadow-lg rounded-lg border-l-4 border-indigo-600 dark:border-yellow-400 transition-transform transform hover:scale-105">
                <h3 className="text-2xl font-semibold text-indigo-600 dark:text-yellow-400 mb-4">Our Mission</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  At LearnMaster, our mission is to make quality education accessible to all, enabling
                  individuals to acquire the skills and knowledge necessary to thrive in a fast-changing
                  world. We strive to offer innovative courses, taught by industry experts, that are
                  flexible and adaptable to the needs of each learner.
                </p>
              </div>
    
              {/* Vision Card */}
              <div className="p-8 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 shadow-lg rounded-lg border-l-4 border-indigo-600 dark:border-yellow-400 transition-transform transform hover:scale-105">
                <h3 className="text-2xl font-semibold text-indigo-600 dark:text-yellow-400 mb-4">Our Vision</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We envision a world where education is a right, not a privilege. Through our platform, we aim 
                  to bridge gaps in education by providing accessible learning opportunities for people across 
                  the globe, creating a community where knowledge is freely shared and nurtured.
                </p>
              </div>
            </div>
          </div>
        </section>
      );
    
}

export default MissionSection