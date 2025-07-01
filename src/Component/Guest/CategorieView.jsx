import React from "react";

const CategoryView = ({ cat }) => {
  return (
    <div className="bg-gray-200 hover:bg-gray-300 cursor-pointer dark:hover:bg-gray-600 dark:bg-gray-700 p-4 rounded-lg  lg:w-[calc(30%-16px)] xl:w-[calc(22%-16px)]">
      <h1 className="font-semibold text-gray-800 dark:text-white">{cat.title}</h1>
    </div>
  );
};

export default CategoryView;
