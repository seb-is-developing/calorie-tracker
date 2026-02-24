import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  age: null,
  height: null,
  weight: null,
  totalExercise: "veryLittle",
  gender: "male",
};

const bodyStatsSlice = createSlice({
  name: "bodyStats",
  initialState,
  reducers: {
    setBodyStats(state, action) {
      const { age, height, weight, totalExercise, gender } = action.payload;
      state.age = age;
      state.height = height;
      state.weight = weight;
      state.totalExercise = totalExercise;
      state.gender = gender;
    },
  },
});

const store = configureStore({
  reducer: {
    bodyStats: bodyStatsSlice.reducer,
  },
});

export const  setBodyStatsActions = bodyStatsSlice.actions;
export default store;
