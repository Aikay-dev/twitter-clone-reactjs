import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "blurHomeBackground",
  initialState: { value: { display: "none" } },
  reducers: {
    changeState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeState } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
