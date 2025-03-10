
import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./reducers/calendarReducer.js";
import rocketReducer from "./reducers/rocketReducer.js";
import spaceDataReducer from "./reducers/spaceDataReducer.js";

const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        rockets: rocketReducer,
        spaceData: spaceDataReducer,
    },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Ensure correct middleware setup
});

export default store;