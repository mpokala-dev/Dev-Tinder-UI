import React from "react";

const UserCard = ({ userdata }) => {
  return (
    <div
      className="card bg-base-300 w-96 shadow-sm gap-6 my-5"
      id={userdata._id}
    >
      <figure className="max-h-90 min-h-50">
        <img src={userdata.photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {userdata?.firstName + " " + userdata?.lastName}
        </h2>
        {userdata?.age && <p>{userdata.age} </p>}
        {userdata?.gender && <p>{userdata.gender} </p>}
        <p>{userdata.about}</p>
        {userdata?.skills && (
          <div className="grid grid-cols-3 gap-2 mt-3 w-full">
            {userdata.skills.map((skill, index) => (
              <span className="wrap-word-break whitespace-normal" key={index}>
                📌{skill}
              </span>
            ))}
          </div>
        )}
        <div className="card-actions justify-center gap-3 mt-4">
          <button className="btn btn-secondary">IGNORE</button>
          <button className="btn btn-primary">INTERESTED</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
