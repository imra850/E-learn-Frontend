import { PublicAxios } from "../Config/axios.config"

export const getAllUsers=async ()=>{
    const response=await PublicAxios.get(`/users`);
    return response.data;
}

export const getUserById=async (userId)=>{
    const response=await PublicAxios.get(`/users/${userId}`);
    return response.data;
}

