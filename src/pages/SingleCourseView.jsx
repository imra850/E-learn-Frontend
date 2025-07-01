import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getCourseById } from "../services/Course.Service";
import SingleCourseDisplay from "../Component/SingleCourseDisplay";


const SingleCourseView = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
  
    async function getCourse() {
      const course = await getCourseById(courseId);
      console.log(course);
      setCourse(course);
    }
    useEffect(() => {
      getCourse();
    }, []);
  
    return (
      <>
        <Helmet>
          <title>{course?.title}</title>
        </Helmet>
        <div className="w-full lg:w-2/3 py-8 mx-auto">
          {course && <SingleCourseDisplay courseToDisplay={course} />}
        </div>
      </>
    );
  };
  
  export default SingleCourseView;