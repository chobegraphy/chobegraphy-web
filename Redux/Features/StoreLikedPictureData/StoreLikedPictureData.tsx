import { createSlice } from "@reduxjs/toolkit";

export interface StoreLikedPictureDataSlice {
  value: any;
}

const initialState: StoreLikedPictureDataSlice = {
  value: [],
};

export const StoreLikedPictureData = createSlice({
  name: "StoreLikedPictureData",
  initialState,
  reducers: {
    SetPictureLikeIds: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetPictureLikeIds } = StoreLikedPictureData.actions;

export default StoreLikedPictureData.reducer;
