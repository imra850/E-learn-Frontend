import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AddCategories } from '../../services/Category.service';
import { useAuth } from '../../Context/AuthContext';
import { useForm } from 'react-hook-form';

const AddCategory = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addedDate, setAddedDate] = useState('');
  const {token,login,user}=useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
     console.log(data);

     try{
         const response= await AddCategories(data);
         console.log(response);
          toast.success("Category Created Successfully");
     
     } catch(error){
      toast.error("Error while creating Category");
       console.log(error);
     }
  };

  return (
    <section className="max-w-xl mx-auto p-6  bg-white dark:bg-gray-800 shadow-md rounded-lg mt-20">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">Add Category</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">Title</label>
          <input
            type="text"
            id="title"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-yellow-400"
            placeholder="Enter category title"
            
            {...register("title", {
              required: "Title is Required !"
             
            })}
          />
          {errors.title && (
              <span className="text-red-400  block px-2">
                {errors.title.message}
              </span>
            )}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">Description</label>
          <textarea
            // value={description}
            // onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-yellow-400"
            placeholder="Enter category description"
            rows="4"
            
            {...register("desc", {
              required: "Description is Required !"
             
            })}
          ></textarea>
           {errors.desc && (
              <span className="text-red-400  block px-2">
                {errors.desc.message}
              </span>
            )}

        </div>

       

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 font-semibold bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition"
          >
            Add Category
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddCategory