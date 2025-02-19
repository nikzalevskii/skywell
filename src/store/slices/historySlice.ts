import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageKeys";

export interface Query {
  city: string;
  timestamp: string;
}

interface HistoryState {
  querries: Query[];
}

const loadHistoryFromLocalStorage = (): Query[] => {
  const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEYS.HISTORY);
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
      state.querries.unshift(action.payload);
      localStorage.setItem(LOCAL_STORAGE_KEYS.HISTORY, JSON.stringify(state.querries));
    },
    clearHistory: (state) => {
      state.querries = [];
      localStorage.removeItem(LOCAL_STORAGE_KEYS.HISTORY);
    },
  },
});

export const { addQuery, clearHistory } = historySlice.actions;
export default historySlice.reducer;
