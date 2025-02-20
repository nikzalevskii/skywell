import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import historyReducer from "./slices/historySlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    history: historyReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
