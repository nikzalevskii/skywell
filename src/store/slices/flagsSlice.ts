import { createSlice } from "@reduxjs/toolkit";

interface FlagsState {
  isTabChangedBySearch: boolean;
}

const initialState: FlagsState = {
  isTabChangedBySearch: false,
};

const flagsSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    setIsTabChangedBySearch: (state, action) => {
      state.isTabChangedBySearch = action.payload;
    },
  },
});

export const { setIsTabChangedBySearch } = flagsSlice.actions;
export default flagsSlice.reducer;
