import { PrivateAxios, PublicAxios } from "../Config/axios.config";

export const AddCategories=async (category)=>{
    const result=await PrivateAxios.post(`/categories`,category);
    return result.data;
  }

  export const getAllCategories=async ()=>{
    const result=await PublicAxios.get("/categories");
    return result.data;
  }

  export const updateCategories=async (category,categoryId)=>{
    const result=await PrivateAxios.put(`/categories/${categoryId}`,category);
    return result.data;
  }

  export const deleteCategory=async (categoryId)=>{
    const result=await PrivateAxios.delete(`/categories/${categoryId}`);
    return result.data;
  }

  export const getCategoryById=async (categoryId)=>{
    const result=await PublicAxios.get(`/categories/${categoryId}`);
    return result.data;
  }

  