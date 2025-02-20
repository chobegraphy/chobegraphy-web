import { createSlice } from "@reduxjs/toolkit";

export interface StoreImgDetailsIdSlice {
  value: string;
}

const initialState: StoreImgDetailsIdSlice = {
  value: "",
};

export const StoreImgDetailsId = createSlice({
  name: "StoreImgDetailsId",
  initialState,
  reducers: {
    SetImgDetailsId: (state, action) => {
      typeof window !== "undefined" &&
        localStorage.setItem("ImgDetailsId", action.payload);
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetImgDetailsId } = StoreImgDetailsId.actions;

export default StoreImgDetailsId.reducer;
