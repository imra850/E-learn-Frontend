import React, { useEffect, useState } from "react";
import { getAllCourses } from '../../services/Course.Service';
import CourseView from "./CourseView";
import { Spinner } from "flowbite-react";
import toast from "react-hot-toast";

const CourseStore = () => {
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(false);
  
    async function loadAllCourses() {
      try {
        setLoading(true);
        const courseData = await getAllCourses();
        console.log(courseData);
        setCourseData(courseData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Error in loading courses");
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      loadAllCourses();
    }, []);
  
    return (
      <div className="main_store_container p-8">
        <h1 className="text-3xl px-20  font-bold">Courses</h1>
  
        {loading && (
          <div className="flex flex-col gap-2  items-center justify-center ">
            <Spinner size="xl" color="success" />
            <p className="text-lg">Loading...</p>
          </div>
        )}
  
        <div className="mt-5 flex flex-col justify-center  md:flex-row  gap-4 flex-wrap">
          {courseData?.content.map((course, index) => (
            <CourseView key={index} course={course} />
          ))}
        </div>
      </div>
    );
}

export default CourseStore