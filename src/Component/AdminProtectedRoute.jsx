import React from 'react'
import { ROLE_GUEST } from '../Config/constant'
import { useAuth } from '../Context/AuthContext'
import { Navigate } from 'react-router';

const AdminProtectedRoute = ({element: Component,role=ROLE_GUEST}) => {
    const {isLogin,user}=useAuth();
    const userRoles=user?.roles.map((role)=> role.roleName);
    console.log(userRoles);
  return isLogin() && userRoles.includes(role) ? (<Component/>) : (<Navigate to={"/login"} />)
}

export default AdminProtectedRoute