
import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./reducers/calendarReducer.js";
import rocketReducer from "./reducers/rocketReducer.js";
import spaceDataReducer from "./reducers/spaceDataReducer.js";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    rockets: rocketReducer,
    spaceData: spaceDataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
