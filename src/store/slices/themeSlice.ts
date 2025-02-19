import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  isPurpleMode: boolean;
}

const initialState: ThemeState = {
  isPurpleMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isPurpleMode = !state.isPurpleMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
