import React from 'react'
import { useForm } from "react-hook-form";
import { CreateUser } from '../services/auth.service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate=useNavigate();
  const onSubmit=async (object)=>{
    console.log(object);

    try{
       const userdata=await CreateUser(object);
       console.log(userdata);
       toast.success("User Registered Successfully");
       navigate("/login");
    } catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    } finally{
      
    }
  }
  return (
    <div className="mt-5 lg:mt-20 dark:bg-gray-900 dark:text-white text-gray-900 flex items-center justify-center ">
      <div className="w-full max-w-md p-8 space-y-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Create an account to access our e-learning platform and unlock
          exciting content.
        </p>

        <form
          className="flex flex-col gap-3"
          action=""
          onSubmit={handleSubmit(onSubmit)}
         
        >
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Name
            </label>
            <input
             
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required !",
                minLength: {
                  value: 5,
                  message: "Name must be at least 5 characters long !",
                },
              })}
            />

{errors.name && (
              <span className="text-red-400  block px-2">
                {errors.name.message}
              </span>
            )}
           
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Email
            </label>
            <input
             
              type="email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is Required !",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Email must be valid !",
                },
              })}
            />
              {errors.email && (
              <span className="text-red-400  block px-2">
                {errors.email.message}
              </span>
            )}           
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Phone Number
            </label>
            <input
              
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your phone number"
              {...register("phoneNumber", {
                required: "Phone number is Required !",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be valid !",
                },
              })}
            />
            {errors.phoneNumber && (
              <span className="text-red-400  block px-2">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Password
            </label>
            <input
             
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is Required !",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter,one lowercase letter,one number and one special character !",
                },
              })}
            />
              {errors.password && (
              <span className="text-red-400  block px-2">
                {errors.password.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              About
            </label>
            <textarea
             
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Tell us something about yourself"
              rows="3"
              {...register("about", {
                required: "Write something about yourself !",
                minLength: {
                  value: 5,
                  message: "Write atleast 5 characters !",
                },
              })}
            ></textarea>

{errors.about && (
              <span className="text-red-400  block px-2">
                {errors.about.message}
              </span>
            )}
           
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Sign Up
            </button>
            <button
              type="reset"
              className="w-full py-2 bg-gray-400 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-500 dark:hover:bg-gray-700"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup