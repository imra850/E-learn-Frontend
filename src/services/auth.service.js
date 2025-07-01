import { PublicAxios } from "../Config/axios.config"

export const CreateUser=async (object)=>{
  const result= await PublicAxios.post("/users",object);
  return result.data;
}

export const LoginUser=async (logindata)=>{
    const result= await PublicAxios.post("/auth/login",logindata);
    return result.data;
  }

 