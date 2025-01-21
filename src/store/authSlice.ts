import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { isSuccess: false },
  reducers: {
    successAuth: (prevState) => {
      prevState.isSuccess = true;
    },
  },
});

export const { successAuth } = authSlice.actions;
export default authSlice.reducer;
