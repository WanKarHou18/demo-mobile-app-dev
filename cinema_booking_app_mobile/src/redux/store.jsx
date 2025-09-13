import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";
import bookingReducer from "./slices/bookingSlice";
import foodBeverageReducer from "./slices/foodBeverageSlice";
import cartReducer from "./slices/cartSlice";
import paymentReducer from "./slices/paymentSlice";
import profileReducer from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    booking: bookingReducer,
    foodBeverage: foodBeverageReducer,
    cart: cartReducer,
    payment: paymentReducer,
    profile: profileReducer,
  },
});

export default store;
