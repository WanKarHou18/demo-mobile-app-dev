// src/redux/features/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    movieId: "",
    movieName: "",
    selectedSeat: [],
    selectedLocation: "",
    selectedDate: "",
    selectedCinema: "",
    selectedTime: "",
    foodBeverage: [],
    price: 0,
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
