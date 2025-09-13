import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/paymentApi";

// Thunk to fetch movies
export const fetchPaymentMethod = createAsyncThunk(
  "movie/fetchPaymentMethod",
  async (_, thunkAPI) => {
    try {
      const result = await api.fetchPaymentMethod();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    paymentMethod: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethod = action.payload;
      })
      .addCase(fetchPaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
