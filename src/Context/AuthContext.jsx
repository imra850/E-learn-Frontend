import { createContext, useContext, useEffect, useState } from "react";
import { getUserLoginData,saveUserLoginData,removeUserLoginData } from "../helper/localStorageHelper";

//created context
const AuthContext = createContext();

//create provider so that it can provide values to children

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getUserLoginData()?.token);

  const [user, setUser] = useState(getUserLoginData()?.user);

  // onLoad,
  //user and token change

  useEffect(() => {
    //save user informations
    if (user && token) saveUserLoginData(token, user);
    else removeUserLoginData();
  }, [user, token]);


    function login(user,token){
        setToken(token);
        setUser(user);
    }

    function isLogin(){
        return token && user;
    }

    function logout(){
        setToken(null);
        setUser(null);
    }

    return <AuthContext.Provider value={{
        user,
        login,
        isLogin,
        logout,
        token
        
    }}>{children}</AuthContext.Provider>
}

export const useAuth=()=> useContext(AuthContext);