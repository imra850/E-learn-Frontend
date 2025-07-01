import React from 'react'
import { useForm } from 'react-hook-form';
import { LoginUser } from '../services/auth.service';
import toast from 'react-hot-toast';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router';

const Login = () => {
 const {user,login,token}= useAuth();
 const navigate=useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit= async(object)=>{
    console.log(object);

    try{
      const logindata=await LoginUser(object);
      console.log(logindata);
      toast.success("Login Success");
      login(logindata.user,logindata.token)
      navigate("/dashboard/home");
    } catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    } finally{

    }
  }
  return <>
    <div className=" lg:mt-24 mt-5  dark:bg-gray-900 dark:text-white text-gray-900 flex items-center justify-center  ">
      <div className="w-full max-w-md p-8 space-y-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Login Here</h2>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Login to continue learning with new courses...
        </p>

        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
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
              Password
            </label>
            <input
             
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is Required !",
              })}
            />
            {errors.password && (
              <span className="text-red-400  block px-2">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex justify-end text-sm">
            <div   className="text-indigo-600 hover:underline">
              Forgot password?
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Login
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
   
  </>
}

export default Login