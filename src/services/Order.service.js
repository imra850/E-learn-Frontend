import { PublicAxios } from "../Config/axios.config"

export const createOrder=async (order)=>{
    const response=await PublicAxios.post('/orders',order);
    return response.data;
}

export const verifyCoursePayment=async (paymentDetail)=>{
    const response=await PublicAxios.post('/orders/verify',paymentDetail);
    return response.data;
}

export const getOrderByUserAndStatus=async (userId, status="PAID")=>{
    const response=await PublicAxios.get(`/orders/user/${userId}/status/${status}`);
    return response.data;
}

export const getAllOrders=async ()=>{
    const response=await PublicAxios.get('/orders');
    return response.data;
}

export const getAllByStatus=async (status="PAID")=>{
    const response=await PublicAxios.get(`/orders/${status}`);
    return response.data;
}