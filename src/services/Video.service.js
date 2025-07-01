import { PrivateAxios } from "../Config/axios.config";


export const createVideoMetaData = async (videoData) => {
    const response = await  PrivateAxios.post("/videos", videoData);
    return response.data;
  };
  
  export const uploadVideo = async (
    videoId,
    videoFile,
    courseId,
    onUploadProgress
  ) => {
    const formData = new FormData();
    formData.append("videoId", videoId);
    formData.append("courseId", courseId);
    formData.append("videoFile", videoFile);
    const resp = await PrivateAxios.post("/videos/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress, 
    });
    return resp.data;
  };

  export const getVideoOfCourse = async (courseId) => {
    const response = await PrivateAxios.get(`/videos/course/${courseId}`);
    return response.data;
  };