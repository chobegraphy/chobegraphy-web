import { createSlice } from "@reduxjs/toolkit";

export interface LanguageSlice {
  value: string;
}

const storedLanguage = localStorage.getItem("Language");
const initialState: LanguageSlice = {
  value: storedLanguage ? storedLanguage : "BN", // Default to "BN" if not in localStorage
};

export const LanguageSlice = createSlice({
  name: "Language",
  initialState,
  reducers: {
    SetLanguageBN: (state) => {
      localStorage.setItem("Language", "BN");
      state.value = "BN";
    },
    SetLanguageEN: (state) => {
      localStorage.setItem("Language", "EN");
      state.value = "EN";
    },
    setLanguage: (state, action) => {
      localStorage.setItem("Language", action.payload); // Sync with localStorage
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetLanguageBN, SetLanguageEN, setLanguage } =
  LanguageSlice.actions;

export default LanguageSlice.reducer;
