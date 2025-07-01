import React from 'react'
import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({element :Component}) => {
    const {login,isLogin,user}=useAuth();
    return isLogin() ? <Component/> : <Navigate to="/login" />
}

export default ProtectedRoute