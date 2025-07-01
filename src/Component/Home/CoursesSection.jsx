import React from 'react'

const CoursesSection = () => {
    const courses = [
        {
          title: "Web Development Bootcamp",
          description:
            "Learn HTML, CSS, JavaScript, and more to build responsive websites.",
          image:
            "./web-development.jpg", 
          link: "#course1",
        },
        {
          title: "Data Science and Machine Learning",
          description:
            "Master data analysis, visualization, and machine learning techniques.",
          image:
            "", 
          link: "#course2",
        },
        {
          title: "Digital Marketing Masterclass",
          description:
            "Understand SEO, social media marketing, and online advertising strategies.",
          image:
            "",
          link: "#course3",
        },
        {
          title: "Graphic Design Essentials",
          description:
            "Learn the principles of design and how to create stunning graphics.",
          image: "",
          link: "#course4",
        },
      ];
    
      return (
        <section className="py-16 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Featured Courses</h2>
            <p className="mb-12 text-gray-600 dark:text-gray-400">
              Explore our top courses and start learning today!
            </p>
            <div className="flex  gap-8 p-8 ">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white h-auto dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {course.description}
                    </p>
                    <a
                      href={course.link}
                      className="inline-block bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-600 text-indigo-900 dark:text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                      >
                      View Course
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
}

export default CoursesSection