import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import { getOrderByUserAndStatus } from '../../services/Order.service';
import { Helmet } from 'react-helmet';
import CourseView from '../../Component/Guest/CourseView';

const MyCourses = () => {
    const {user}=useAuth();
    const [myCourses,setMyCourses]=useState([]);

    const loadAllCourses=async ()=>{
        const getMyCourses=await getOrderByUserAndStatus(user.id);
        console.log(getMyCourses);
        setMyCourses(getMyCourses);
    }

    useEffect(()=>{
         if(user){
            loadAllCourses();
         } 
    },[user])

  return (
    <div className=" mt-14 px-8 py-6">
    <Helmet>
      <title>My Courses</title>
    </Helmet>
    <h1 className="text-xl font-bold">My Courses</h1>
    <div className="course_container  mt-5 flex flex-col  md:flex-row  gap-3 flex-wrap">
      {myCourses.map((course, index) => (
        <CourseView my={true} key={index} course={course.course} />
      ))}
    </div>
  </div>
  )
}

export default MyCourses