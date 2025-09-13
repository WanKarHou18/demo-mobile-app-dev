// src/redux/features/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    selectedMovie: {},
    selectedSeats: [],
    selectedLocation: "",
    // selectedDate: "",
    selectedCinema: "",
    selectedTime: "",
    foodBeverage: [],
    ticketPrice: 0,
    foodBeveragePrice: 0,
    totalPrice: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartDetail: (state, action) => {
      state.cart = {
        ...state.cart,
        ...action.payload,
      };
    },

    clearCart: (state) => {
      state.cart = initialState.cart;
    },
  },
});

export const { updateCartDetail, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
