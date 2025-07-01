import React, { useEffect, useState } from 'react'
import { FaUser, FaBook, FaDollarSign, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../../Context/AuthContext';
import { getUserById } from '../../services/User.Service';
import { getAllUsers } from '../../services/User.Service';
import { getAllCourses } from '../../services/Course.Service';
import { getAllByStatus } from '../../services/Order.service';


const AdminHomePage = () => {
  const [adminName,setAdminName]=useState("");
  const {user}=useAuth();
  const [userlength,setUserLength]=useState(null);
  const [courseLength,setCourseLenght]=useState(null);
  const [totalIncome,setTotalIncome]=useState(null);
  
  useEffect(()=>{
    const getUser=async ()=>{
       const data=await getUserById(user.id);
       console.log(data.name);
       setAdminName(data.name);
    }
    getUser();
  },[]);


  useEffect(()=>{
        const fetchUsers=async ()=>{
          const response=await getAllUsers();
          console.log(response.length);
          setUserLength(response.length);
         
        }
  
        fetchUsers();
      },[])

      useEffect(()=>{
        const getcourse=async ()=>{
          const fetchAllCourses=await getAllCourses();
          console.log(fetchAllCourses.content.length);
          setCourseLenght(fetchAllCourses.content.length);
        }
        getcourse();
      },[])

      useEffect(()=>{
        const getByStatus=async ()=>{
          const status=await getAllByStatus();
          console.log(status);
          console.log(status[0].amount);
          let count=0;
          for(let i=0; i<status.length; i++){
            count=count+status[i].amount/100;
            console.log(count);
          }
          setTotalIncome(count);
          console.log(totalIncome);

        }
        getByStatus();
      },[])

  return (
    <div className="p-6 mt-16">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Welcome Back, {adminName}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's an overview of your platform's performance.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500 rounded-full text-white">
              <FaUser className="text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600 dark:text-gray-400">Total Users</p>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{userlength}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-500 rounded-full text-white">
              <FaBook className="text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600 dark:text-gray-400">Total Courses</p>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{courseLength}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-500 rounded-full text-white">
              <FaDollarSign className="text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600 dark:text-gray-400">Total Income</p>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{totalIncome}</h2>
            </div>
          </div>
        </div>

       
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Activities</h2>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-400">No recent activities to show.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage