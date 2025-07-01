import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AddCourses } from "../../services/Course.Service";
import { FileInput,Label } from "flowbite-react";
import { uploadCoursebanner } from "../../services/Course.Service";
import MyRichTextEditor from "../../Component/MyRichTextEditor";

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [longDesc,setLongDesc]=useState(false);

  // const validateLongDesc = () => {
  //   if (!longDesc || longDesc.trim() === "<p><br></p>") {
  //     setError("longDesc", {
  //       type: "manual",
  //       message: "Long description is required",
  //     });
  //     return false;
  //   } else {
  //     clearErrors("longDesc");
  //     return true;
  //   }
  // };

  const uploadBanner = async (banner, courseId) => {
    console.log(courseId, banner);
    try {
      await uploadCoursebanner(courseId, banner);
      toast.success("banner updated");
    } catch (error) {
      toast.error("banner uploaded");
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    // console.log("Form Data:", data);
    // if (!validateLongDesc()) return;

    console.log(data);
    try {
      const course = await AddCourses(data);


      toast.success("course added");

      await uploadBanner(data.bannerFile[0], course.id);
      
      reset();
    } catch (error) {
      toast.error("Error in adding data");
      console.log(error);
    }
  };
  return (
    <section className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 h-full shadow-md rounded-lg mt-20">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
        Add Course
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Course Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-yellow-400"
            placeholder="Enter course title"
            {...register("title", { required: "Title is required!" })}
          />
          {errors.title && (
            <span className="text-red-400 block px-2">{errors.title.message}</span>
          )}
        </div>

    
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Short Description
          </label>
          <textarea
            rows="2"
            className="w-full px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-yellow-400"
            placeholder="Enter short description"
            {...register("shortDesc", { required: "Short description is required!" })}
          ></textarea>
          {errors.shortDesc && (
            <span className="text-red-400 block px-2">
              {errors.shortDesc.message}
            </span>
          )}
        </div>

      
        {/* <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Long Description
          </label>
          <MyRichTextEditor
              value={longDesc}
              onChange={setLongDesc}
              placeholder="Enter long description"
              
            />
            {errors.longDesc && (
              <p className="text-red-500 text-sm mt-1">
                {errors.longDesc.message}
              </p>
            )}
        </div> */}

        
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-yellow-400"
            placeholder="Enter course price"
            {...register("price", { required: "Price is required!" })}
          />
          {errors.price && (
            <span className="text-red-400 block px-2">{errors.price.message}</span>
          )}
        </div>

      
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Is Live?
          </label>
          <input
            type="checkbox"
            className="w-5 h-5 text-indigo-600 dark:text-yellow-400 rounded focus:ring-2 focus:ring-indigo-600 dark:focus:ring-yellow-400"
            {...register("live")}
          />
        </div>

      
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Discount Percentage
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-yellow-400"
            placeholder="Enter discount percentage"
            {...register("discount")}
          />
        </div>

       
        <div>
            <div id="fileUpload" className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload Banner" />
              </div>
              <FileInput
                {...register("bannerFile", {})}
                id="file"
                helperText="Banner is shown on course view page"
              />
            </div>
          </div>


       
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 font-semibold bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition"
          >
            Add Course
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddCourse;
