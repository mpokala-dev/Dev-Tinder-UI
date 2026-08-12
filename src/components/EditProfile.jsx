import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import Toast from "./Toast";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [skills, setSkills] = useState(user?.skills);
  const [location, setLocation] = useState(user?.location);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastStatus, setToastStatus] = useState("info");

  const handleSaveProfile = async () => {
    try {
      const updatedUserDetails = await axios.patch(
        BASE_URL + "/profile/update",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
          skills:
            skills.length > 0 && !Array.isArray(skills)
              ? skills.split(",")
              : skills,
          location,
        },
        { withCredentials: true },
      );
      setToastStatus("success");
      dispatch(addUser(updatedUserDetails.data.data));
      setToastMessage(updatedUserDetails.data.message);
      setShowToast(true);
      setError("");
      setTimeout(() => {
        setShowToast(false);
        setToastMessage("");
      }, 5000);
    } catch (err) {
      setToastStatus("error");
      setToastMessage(err?.response?.data?.message);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setToastMessage("");
      }, 5000);
      setError(err?.response?.data?.message || "Something is wrong.");
    }
  };

  return (
    user && (
      <div className="card bg-base-300 w-96 my-10 justify-center">
        {showToast && <Toast message={toastMessage} toatstType={toastStatus} />}
        <div className="card-body">
          <h2 className="card-title justify-center">User Profile</h2>
          {error !== "" && <p className="text-red-500">{error}</p>}
          <fieldset>
            <legend className="fieldset-legend">First Name</legend>
            <label className="input validator">
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setError("");
                  setFirstName(e.target.value);
                }}
                minLength="2"
                required
              />
            </label>
            <div className="validator-hint hidden">
              Please enter valid First Name
            </div>
          </fieldset>
          <fieldset>
            <legend className="fieldset-legend">Last Name</legend>
            <label className="input validator">
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setError("");
                  setLastName(e.target.value);
                }}
                required
                minLength="2"
              />
            </label>
            <p className="validator-hint hidden">
              Please enter valid Last Name
            </p>
          </fieldset>
          <fieldset>
            <legend className="fieldset-legend">Age</legend>
            <label className="input validator">
              <input
                type="number"
                value={age}
                onChange={(e) => {
                  setError("");
                  setAge(e.target.value);
                }}
                min="18"
                required
              />
            </label>
            <div className="validator-hint hidden">
              User must be of minimum 18 years old.
            </div>
          </fieldset>
          <fieldset>
            <legend className="fieldset-legend">Gender</legend>
            <span className="mr-2.5">
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                className="radio radio-xs mr-1"
              />
              <span className="label" htmlFor="male">
                Male
              </span>
            </span>
            <span className="mr-2.5">
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
                className="radio radio-xs mr-1"
              />
              <span className="label" htmlFor="female">
                Female
              </span>
            </span>
            <span className="mr-2.5">
              <input
                type="radio"
                name="gender"
                id="others"
                value="others"
                checked={gender === "others"}
                onChange={(e) => setGender(e.target.value)}
                className="radio radio-xs mr-1"
              />
              <span className="label" htmlFor="others">
                Others
              </span>
            </span>
          </fieldset>
          <fieldset>
            <legend className="fieldset-legend">Location</legend>
            <label className="input validator">
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setError("");
                  setLocation(e.target.value);
                }}
              />
            </label>
          </fieldset>
          <fieldset>
            <legend className="fieldset-legend">About</legend>
            <textarea
              className="textarea"
              value={about}
              placeholder="Bio"
              onChange={(e) => {
                setError("");
                setAbout(e.target.value);
              }}
            ></textarea>
          </fieldset>
          <fieldset>
            <legend className="fieldset-legend">Skills</legend>
            <label className="input validator">
              <input
                type="text"
                value={skills}
                placeholder="Separate skills with coma"
                className="input"
                onChange={(e) => {
                  setError("");
                  setSkills(e.target.value);
                }}
              />
            </label>
          </fieldset>
          <fieldset>
            <legend className="fieldset-legend">Photo Url</legend>
            <label className="input validator">
              <input
                type="url"
                className="text"
                value={photoUrl}
                onChange={(e) => {
                  setError("");
                  setPhotoUrl(e.target.value);
                }}
              ></input>
            </label>
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSaveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditProfile;
