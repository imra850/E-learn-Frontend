import { Badge, Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export function getPriceAfterDiscount(price, discount) {
  return (price - (price * discount) / 100).toFixed(0);
}

const CourseView = ({ course, my=false }) => {
  return (
    <div className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33%-20px)] xl:w-[calc(30%-24px)] flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 ease-in-out">
      {/* Image Section */}
      <div className="relative w-full h-52 bg-gray-100 dark:bg-gray-800">
        <img
          className="w-full h-full object-cover"
          src={course?.bannerUrl}
          alt={course?.title}
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col  flex-grow">
        {/* Title */}
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
          {course?.title}
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
          {course?.shortDesc}
        </p>
        {
          my &&  <div className="flex items-center justify-center gap-3 mt-4">
          <Button as={Link} to={`/learning/${course.id}`} size="sm" color="purple">
            start Learning
          </Button>
          </div>
        }

        { !my && <div>
        <div className="flex items-center gap-2 mt-3">
          {course?.discount > 0 && (
            <span className="text-gray-400 text-sm font-medium line-through">
              ₹{course?.price}
            </span>
          )}
          {course?.discount > 0 && <Badge color="info">{course?.discount}% Off</Badge>}
          <span className="text-lg font-bold text-green-500">
            ₹{getPriceAfterDiscount(course?.price, course?.discount)}
          </span>
        </div>

        <div className="flex gap-3 mt-4">
          {/* <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white ">
            Buy Now
          </Button> */}
          <Button
            as={Link}
            to={`/courses/${course?.id}`}
            size="sm"
            className="bg-gray-700 hover:bg-gray-800 text-white "
          >
            View Details
          </Button>
        </div>
        </div>}
      </div>
    </div>
  );
};

export default CourseView;
