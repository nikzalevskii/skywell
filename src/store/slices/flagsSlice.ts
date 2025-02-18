import { createSlice } from "@reduxjs/toolkit";

interface FlagsState {
  isCityChanged: boolean;
}

const initialState: FlagsState = {
  isCityChanged: false,
};

const flagsSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    setIsCityChanged: (state, action) => {
      state.isCityChanged = action.payload;
    },
  },
});

export const { setIsCityChanged } = flagsSlice.actions;

export default flagsSlice.reducer;
