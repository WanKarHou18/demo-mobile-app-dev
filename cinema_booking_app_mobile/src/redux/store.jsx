import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";
import bookingReducer from "./slices/bookingSlice";
import foodBeverageReducer from "./slices/foodBeverageSlice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    booking: bookingReducer,
    foodBeverage: foodBeverageReducer,
  },
});

export default store;
