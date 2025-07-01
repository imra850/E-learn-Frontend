import React from 'react'
import { Helmet } from 'react-helmet'
import CourseStore from '../Component/Guest/CourseStore';
import Categories from '../Component/Guest/Categories';


const Courses = () => {
  return (
    <>
      <Helmet >
        <title >Courses</title>
      </Helmet>
      <div className="w-full  py-8 ">
       
        <CourseStore />
      </div>
    </>
  );
};

export default Courses