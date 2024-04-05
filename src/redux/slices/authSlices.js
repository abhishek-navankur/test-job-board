import { createSlice } from "@reduxjs/toolkit";

const userValues =
  localStorage.getItem("userInfo") !== null
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: userValues,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    updateUserProfile: (state, action) => {
      state.user = {
        ...state.user,
        username: action.payload.username,
        exp: { ...action.payload.exp },
      };
      localStorage.setItem("userInfo", JSON.stringify(state.user));
    },
    updateJobsApplied: (state, action) => {
      state.user = {
        ...state.user,
        jobsApplied: [...state.user.jobsApplied, { ...action.payload.data }],
      };
      localStorage.setItem("userInfo", JSON.stringify(state.user));
    },
    logout: (state) => {
      localStorage.setItem("userInfo", null);
      state.user = null;
    },
  },
});

export const { login, logout, updateJobsApplied, updateUserProfile } =
  authSlice.actions;

export const selectUser = (state) => state.user.user;

export default authSlice.reducer;
