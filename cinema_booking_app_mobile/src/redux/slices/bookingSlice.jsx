import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/bookingApi";

// Thunk to fetch booking setting
export const fetchBookingSetting = createAsyncThunk(
  "movie/fetchBookingSetting",
  async (_, thunkAPI) => {
    try {
      console.log("hello, we are here");
      const result = await api.fetchBookingSetting();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingSetting.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBookingSetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
