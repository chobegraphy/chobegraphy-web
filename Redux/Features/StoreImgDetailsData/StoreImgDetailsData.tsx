import { createSlice } from "@reduxjs/toolkit";

export interface StoreImgDetailsDataSlice {
  value: object;
}

const initialState: StoreImgDetailsDataSlice = {
  value: {},
};

export const StoreImgDetailsData = createSlice({
  name: "StoreImgDetailsData",
  initialState,
  reducers: {
    SetImgDetailsData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetImgDetailsData } = StoreImgDetailsData.actions;

export default StoreImgDetailsData.reducer;
