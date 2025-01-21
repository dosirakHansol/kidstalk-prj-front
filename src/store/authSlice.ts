import { createSlice } from "@reduxjs/toolkit";
import { resetAuthCookie } from "../api/cookies";

export const authSlice = createSlice({
  name: "auth",
  initialState: { isSuccess: false },
  reducers: {
    successAuth: (prevState) => {
      prevState.isSuccess = true;
    },
    logoutAuth: (prevState) => {
      prevState.isSuccess = false;
      resetAuthCookie();
    },
  },
});

export const { successAuth, logoutAuth } = authSlice.actions;
export default authSlice.reducer;
