import { PrivateAxios, PublicAxios } from "../Config/axios.config"

export const AddCourses=async (course)=>{
    const result=await PrivateAxios.post(`/courses`,course);
    return result.data;
  }
  export const getAllCourses = async (
    page = 0,
    size = 50,
    sort = "createdDate,desc"
  ) => {
    const response = await PublicAxios.get(
      `/courses?page=${page}&size=${size}&sort=${sort}`
    );
    return response.data;
  };
  export const getCourseById = async (id) => {
    const response = await PublicAxios.get(`/courses/${id}`);
    return response.data;
  };
  
  //update course
  
  export const updateCourse = async (course, id) => {
    const response = await PrivateAxios.put(`/courses/${id}`, course);
    return response.data;
  };
  
  //delete
  
  export const deleteCourse = async (id) => {
    const response = await PrivateAxios.delete(`/courses/${id}`);
    return response.data;
  };
  

  export const uploadCoursebanner = async (courseId, banner) => {
    let formData = new FormData();
    formData.append("banner", banner);
    const response = await PrivateAxios.post(
      `/courses/${courseId}/banners`,
      formData
    );
    return response.data;
  };