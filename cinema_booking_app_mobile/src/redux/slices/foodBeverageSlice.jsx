import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/foodBeverageApi";

// Thunk to fetch movies
export const fetchFoodBeverageItems = createAsyncThunk(
  "movie/fetchFoodBeverageItems",
  async (_, thunkAPI) => {
    try {
      const result = await api.fetchFoodBeverageItems();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const foodBeverageSlice = createSlice({
  name: "foodBeverage",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodBeverageItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodBeverageItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFoodBeverageItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default foodBeverageSlice.reducer;
