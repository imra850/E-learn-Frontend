import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../services/User.Service';
import { Helmet } from 'react-helmet';
import { Table } from 'flowbite-react';

const AllUsers = () => {
    const [users,setUsers]=useState([]);

    useEffect(()=>{
      const fetchUsers=async ()=>{
        const response=await getAllUsers();
        console.log(response);
        setUsers(response);
      }

      fetchUsers();
    },[])
  return (
    <div className="mt-7">
      <Helmet>All Users</Helmet>
      <div className="p-4">
        <div className="p-4">All Users</div>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User_ID</Table.HeadCell>
              <Table.HeadCell>User_Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>phoneNumber</Table.HeadCell>
              <Table.HeadCell>Roles</Table.HeadCell>
              <Table.HeadCell>Registered Date</Table.HeadCell>
              
            </Table.Head>
            <Table.Body>
              {users.map((user, index) => (
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.phoneNumber}</Table.Cell>
                  {
                    user.roles.map((role,index)=>(
                        <div className="flex flex-col">
                        <Table.Cell key={index}>{role.roleName}</Table.Cell>
                        </div>
                    ))
                  }
                
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default AllUsers