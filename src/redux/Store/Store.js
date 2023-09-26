import { combineReducers, configureStore } from "@reduxjs/toolkit";
import Notification from "redux/Slice/Notification";

export const rootReducer = combineReducers({
  Notification,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
