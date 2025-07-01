import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { getUserLoginData } from "../helper/localStorageHelper";


export const baseUrl="http://localhost:8081/api/v1";   //imran

export const PublicAxios=axios.create({
    baseURL:baseUrl,
    timeout:5000,
});

export const PrivateAxios=axios.create({
    baseURL:baseUrl,
    timeout:5000,
});

PrivateAxios.interceptors.request.use(
    function(config){
        const token=getUserLoginData().token;
        if(token){
            config.headers["Authorization"]=`Bearer ${token}`;
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

