import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/movieApi";

// Thunk to fetch movies
export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (_, thunkAPI) => {
    try {
      const result = await api.fetchMovies();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
