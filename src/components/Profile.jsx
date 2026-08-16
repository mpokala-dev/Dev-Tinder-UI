// import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";

export const Profile = () => {
  const userData = useSelector((state) => state.user);
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 px-4">
      <div className="w-full max-w-md">
        <EditProfile />
      </div>

      {userData && (
        <div className="w-full max-w-md">
          <UserCard userdata={userData} />
        </div>
      )}
    </div>
  );
};
