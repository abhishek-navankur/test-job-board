import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../utils/updateProfile";
import { updateUserProfile } from "../../redux/slices/authSlices";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  const initData = {
    username: user.username,
    college: user?.exp?.college || "",
    totalExp: user?.exp?.totalExp || "",
    currentTitle: user?.exp?.currentTitle || "",
  };
  const [data, setData] = React.useState(initData);
  const dispatch = useDispatch();
  // Function to handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({ user, exp: data }).then((res) => {
      if (res.success) {
        dispatch(
          updateUserProfile({
            username: data.username,
            exp: {
              college: data.college,
              totalExp: data.totalExp,
              currentTitle: data.currentTitle,
            },
          })
        );
      }
    });
  };
  return (
    <>
      <h2 className="text-2xl mt-10">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mt-5 max-w-lg">
        <input
          required
          name="username"
          value={data.username}
          onChange={handleChange}
          className="w-full px-3 py-1 rounded"
          type="text"
          placeholder="Username"
        />
        <input
          required
          name="college"
          value={data.college}
          onChange={handleChange}
          className="w-full px-3 py-1 rounded"
          type="text"
          placeholder="College"
        />
        <input
          required
          name="totalExp"
          min={0}
          value={data.totalExp}
          onChange={handleChange}
          className="w-full px-3 py-1 rounded"
          type="number"
          placeholder="Total Work Experience"
        />
        <input
          required
          name="currentTitle"
          value={data.currentTitle}
          onChange={handleChange}
          className="w-full px-3 py-1 rounded"
          type="text"
          placeholder="Current Title"
        />
        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-800 duration-300 px-5 py-2 w-full rounded-md"
        >
          Save
        </button>
      </form>
    </>
  );
}
