import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";
import bookingReducer from "./slices/bookingSlice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    booking: bookingReducer,
  },
});

export default store;
