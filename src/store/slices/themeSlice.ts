import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageKeys";

interface ThemeState {
  isPurpleMode: boolean;
}

const loadThemeFromLocalStorage = (): boolean => {
  const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME);
  return storedTheme ? JSON.parse(storedTheme) : false;
};

const initialState: ThemeState = {
  isPurpleMode: loadThemeFromLocalStorage(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isPurpleMode = !state.isPurpleMode;
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.THEME,
        JSON.stringify(state.isPurpleMode)
      );
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
