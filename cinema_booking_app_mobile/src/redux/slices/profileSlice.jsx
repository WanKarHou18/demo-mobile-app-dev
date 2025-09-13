import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/profileApi";

// Thunk to fetch profile info
export const fetchProfileInfo = createAsyncThunk(
  "movie/fetchProfileInfo",
  async (_, thunkAPI) => {
    try {
      const result = await api.fetchProfileInfo();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    profile: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfileInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
