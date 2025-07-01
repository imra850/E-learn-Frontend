import React from 'react'
import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useAuth } from '../../Context/AuthContext';
import { useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
import { ConvertRoleObject } from '../../helper/ConvertRoleObjectToArray';
import { ROLE_ADMIN, ROLE_GUEST } from '../../Config/constant';
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);
  const { user, logout } = useAuth();
  return (
    <>
      <div className="">
        {/* content area */}
        <div className={isOpen ? "pl-80" : ""}>
          <div className="p-4">
            <Outlet />
          </div>
        </div>
        <Drawer
          className="mt-14"
          backdrop={false}
          open={isOpen}
          onClose={handleClose}
        >
          <Drawer.Header title="USER DASHBOARD" titleIcon={() => <></>} />
          <Drawer.Items>
            <Sidebar
              aria-label="Sidebar with multi-level dropdown example"
              className="[&>div]:bg-transparent [&>div]:p-0"
            >
              <div className="flex h-full flex-col justify-between py-2">
                <div>
                  <form className="pb-3 md:hidden">
                    <TextInput
                      icon={HiSearch}
                      type="search"
                      placeholder="Search"
                      required
                      size={32}
                    />
                  </form>
                  <Sidebar.Items>
                    <Sidebar.ItemGroup>
                      <Sidebar.Item
                      as={Link}
                      to={'/dashboard/home'}
                        icon={HiChartPie}
                      >
                        Dashboard
                      </Sidebar.Item>
                      <Sidebar.Item
                       as={Link}
                       to={'/dashboard/profile'}
                        icon={HiShoppingBag}
                      >
                        Profile
                      </Sidebar.Item>
                      <Sidebar.Item as={Link} to={'/dashboard/myCourses'} icon={HiUsers}>
                        My Courses
                      </Sidebar.Item>
                      <Sidebar.Item
                        as={Link}
                        to={`/dashboard/store`}
                        icon={HiLogin}
                      >
                        Store
                      </Sidebar.Item>
                     
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                     
                    
                      {/* <Sidebar.Item
                        icon={HiInformationCircle}
                        
                      
                      >
                        Logout
                      </Sidebar.Item> */}

                    
                       
                       {
                         ConvertRoleObject(user.roles).includes(ROLE_ADMIN) ? 
                         <Sidebar.Item
                         icon={HiInformationCircle}
                         as={Link}
                         to="/admin"
                       >
                         Admin Dashboard
                       </Sidebar.Item> : ""
                       }
                      
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </div>
              </div>
            </Sidebar>
          </Drawer.Items>
        </Drawer>
      </div>
    </>
  );
}

export default Dashboard