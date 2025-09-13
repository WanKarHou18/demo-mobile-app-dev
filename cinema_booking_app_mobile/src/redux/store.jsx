import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";
import bookingReducer from "./slices/bookingSlice";
import foodBeverageReducer from "./slices/foodBeverageSlice";
import cartReducer from "./slices/cartSlice";
import paymentReducer from "./slices/paymentSlice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    booking: bookingReducer,
    foodBeverage: foodBeverageReducer,
    cart: cartReducer,
    payment: paymentReducer,
  },
});

export default store;
