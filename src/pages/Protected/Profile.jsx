import React from "react";
import { useAuth } from "../../Context/AuthContext";
import UserProfileCard from "../../Component/UserProfileCard";
const Profile = () => {
  const { user } = useAuth();
  return (
   
     
      <div className="flex justify-center mt-16">
        <UserProfileCard user1={user} />
         
      </div>
   
  );
};

export default Profile;