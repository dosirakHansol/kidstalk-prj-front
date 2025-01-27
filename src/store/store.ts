import { configureStore } from "@reduxjs/toolkit";

import authSlice, { logoutAuth } from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const logoutAction = () => {
  store.dispatch(logoutAuth());
};
export default store;
