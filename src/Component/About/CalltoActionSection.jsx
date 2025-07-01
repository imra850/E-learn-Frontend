import React from 'react'

const CalltoActionSection = () => {
    return (
        <section className="text-center text-white relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg shadow-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Learning Experience?</h2>
            <p className="text-lg mb-8">
              Join thousands of learners who are enhancing their skills and achieving their goals with LearnMaster.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/signup"
                className="bg-yellow-400 dark:bg-yellow-500 text-indigo-900 dark:text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Sign Up Now
              </a>
              <a
                href="/courses"
                className="border-2 border-yellow-400 dark:border-yellow-500 text-yellow-400 dark:text-yellow-400 font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:bg-yellow-400 hover:text-indigo-900 hover:dark:text-gray-900"
              >
                Explore Courses
              </a>
            </div>
          </div>
        </section>
      );
}

export default CalltoActionSection