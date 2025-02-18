import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Query {
  city: string;
  timestamp: string;
}

interface HistoryState {
  querries: Query[];
}

const loadHistoryFromLocalStorage = (): Query[] => {
  const storedHistory = localStorage.getItem("history");
  return storedHistory ? JSON.parse(storedHistory) : [];
};

const initialState: HistoryState = {
  querries: loadHistoryFromLocalStorage(),
};


const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addQuery: (state, action: PayloadAction<Query>) => {
      state.querries.push(action.payload);
      localStorage.setItem("history", JSON.stringify(state.querries));
    },
    clearHistory: (state) => {
      state.querries = [];
      localStorage.removeItem("history");
    },
  },
});

export const { addQuery, clearHistory } = historySlice.actions;
export default historySlice.reducer;
