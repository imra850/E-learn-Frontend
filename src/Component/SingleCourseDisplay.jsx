import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import HtmlRenderer from "./HtmlRender";
import { timeAgo } from "../helper/TimeHelper";
import { Button } from "flowbite-react";
import { useAuth } from "../Context/AuthContext";
const SingleCourseDisplay = ({ courseToDisplay, userView = true }) => {
    const { isLogin } = useAuth();
    const navigate = useNavigate();
    console.log(courseToDisplay);

     function getPriceAfterDiscount(price, discount) {
        return (price - (price * discount) / 100).toFixed(0);
      }
    
  
    function handBuyNow() {
      if (isLogin()) {
        navigate(`/dashboard/order/${courseToDisplay.id}`);
      } else {
        toast.error("Please login to buy the course ! ");
        navigate("/login");
      }
    }
  
    return (
      <div className="flex flex-col gap-4 mt-14 justify-center items-center">
        <img
          src={courseToDisplay?.bannerUrl}
          alt={courseToDisplay?.title}
          fallbackSrc={
            "https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg"
          }
          onError={(e) => {
            e.target.src = src; 
            e.target.onerror = null; 
          }}
          className="w-full rounded max-h-96 object-cover"
        />
  
      
  
        <div className="w-full flex flex-col gap-3 p-4 ">
          {!userView && (
            <div className="">
              <h1 className="font-bold text-xl">{courseToDisplay?.title}</h1>
              <p>{courseToDisplay?.shortDesc}</p>
            </div>
          )}
  
          {userView && (
            <div className="flex flex-col md:flex-row justify-between gap-3">
              <div className="course_title_info  w-full md:w-2/3 ">
                <h1 className="font-bold text-xl">{courseToDisplay?.title}</h1>
                <p>{courseToDisplay?.shortDesc}</p>
              </div>
              <div className="buy_now_button   w-fit border-red-500">
                <Button onClick={handBuyNow} color="success">
                  Buy Now
                </Button>
              </div>
            </div>
          )}
  
          <p className="p-10 rounded-lg bg-gray-200 dark:bg-gray-600 ">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Course Description
            </h1>
            <HtmlRenderer htmlContent={courseToDisplay?.long_description} />
          </p>
  
          {/* live , course and discount */}
  
          <div className=" w-full mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Price Details
            </h1>
  
            {/* Price */}
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Price:
              </span>
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                ₹ {courseToDisplay?.price.toFixed(2)}
              </span>
            </div>
  
            {/* Discount */}
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Discount:
              </span>
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {courseToDisplay?.discount}%
              </span>
            </div>
  
            {/* Live Status */}
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status:
              </span>
              <span
                className={`text-lg font-semibold ${
                  courseToDisplay?.live
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {courseToDisplay?.live ? "Live" : "Offline"}
              </span>
            </div>
  
            {/* Created Date */}
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Created Date:
              </span>
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {timeAgo(courseToDisplay?.createdDate)}
              </span>
            </div>
  
            {/* Final Price */}
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Final Price:</h2>
              <p className="text-xl font-bold">
                ₹
                {getPriceAfterDiscount(
                  courseToDisplay?.price,
                  courseToDisplay?.discount
                )}
              </p>
            </div>
            {userView && (
              <div className="flex gap-2 justify-center mt-5">
                <Button onClick={handBuyNow} color="success">
                  Buy Now
                </Button>
                {/* <Button color="indigo">Store Page</Button> */}
              </div>
            )}
          </div>
  
          {/* course information apne style mein design karoge */}
        </div>
      </div>
    );
  };
  
  export default SingleCourseDisplay;