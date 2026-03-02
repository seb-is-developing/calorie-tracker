import { createSlice, configureStore } from "@reduxjs/toolkit";

const userDataState = {
  age: null,
  height: null,
  weight: null,
  totalExercise: "veryLittle",
  gender: "male",
};
const userConsumedCaloriesState = {
  consumedCalories: [],
};

const userExerCiseState = {
  amountOfExercise: [],
};

const bodyStatsSlice = createSlice({
  name: "bodyStats",
  initialState: userDataState,
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

const consumedCaloriesSlice = createSlice({
  name: "consumedCalories",
  initialState: userConsumedCaloriesState,
  reducers: {
    addConsumedCalories(state, action) {
      state.consumedCalories.push(action.payload);
    },
    deleteConsumedCalories(state, action) {
      state.consumedCalories = state.consumedCalories.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

const exerciseSlice = createSlice({
  name: "exercise",
  initialState: userExerCiseState,
  reducers: {
    addExercise(state, action) {
      state.amountOfExercise.push(action.payload);
    },
    deleteExercise(state, action) {
      state.amountOfExercise = state.amountOfExercise.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

const store = configureStore({
  reducer: {
    bodyStats: bodyStatsSlice.reducer,
    consumedCalories: consumedCaloriesSlice.reducer,
    exercise: exerciseSlice.reducer,
  },
});

export const consumedCaloriesActions = consumedCaloriesSlice.actions;
export const exerciseActions = exerciseSlice.actions;
export const setBodyStatsActions = bodyStatsSlice.actions;
export default store;
