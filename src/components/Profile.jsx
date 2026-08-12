// import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";

export const Profile = () => {
  const userData = useSelector((state) => state.user);
  return (
    <div className="flex items-center justify-center gap-4">
      <EditProfile />
      {userData && <UserCard userdata={userData} key="user-profile-card" />}
    </div>
  );
};
