import React, { useState } from "react";
import { HiChartPie, HiClipboard, HiCollection, HiInformationCircle, HiLogin, HiPencil, HiShoppingBag, HiUsers } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useAuth();

  const menuItems = [
    { name: "Dashboard", icon: HiChartPie, path: "/admin/home" },
    { name: "Profile", icon: HiShoppingBag, path: "/dashboard/profile" },
    { name: "All Courses", icon: HiUsers, path: "/admin/courses" },
    { name: "Categories", icon: HiLogin, path: "/admin/categories" },
    { name: "Add Course", icon: HiPencil, path: "/admin/add-course" },
    { name: "Add Category", icon: HiPencil, path: "/admin/add-category" },
    { name: "Upload Videos", icon: HiClipboard, path: "/admin/upload-video" },
    { name: "Orders", icon: HiCollection, path: "/admin/all-orders"},
    { name: "Users", icon: HiCollection, path: "/admin/all-users" },
  ];

  return (
    <div className="flex h-screen">
 
      <div
        className={`fixed top-0 left-0 h-screen ${
          isOpen ? "w-64" : "w-16"
        } dark:bg-gray-800 bg-gray-50 text-gray-900 dark:text-gray-100 flex flex-col transition-all duration-300`}
      >
        <div className="p-4 flex justify-between items-center mt-14">
          <h1 className={`${isOpen ? "text-lg font-bold" : "hidden"}`}>
            Admin
          </h1>
          <button
            className="p-2 text-white bg-gray-700 hover:bg-gray-600 rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "<" : ">"}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path.startsWith("http") ? undefined : item.path}
              href={item.path.startsWith("http") ? item.path : undefined}
              target={item.path.startsWith("http") ? "_blank" : undefined}
              rel={item.path.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`flex items-center gap-2 p-3 rounded ${
                isOpen ? "hover:bg-gray-700" : "hover:bg-transparent"
              }`}
            >
              <item.icon className="text-xl" />
              {isOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </div>
      </div>

      <div
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isOpen ? "16rem" : "4rem" }}
      >
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
