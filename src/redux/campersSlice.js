import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const buildQuery = (filters) => {
  const params = new URLSearchParams();

  if (filters.location) params.append("location", filters.location);
  if (filters.type) params.append("type", filters.type);
  filters.features?.forEach((f) => params.append("features[]", f));

  return params.toString();
};

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters = {}) => {
    const query = buildQuery(filters);
    const response = await axios.get(
      `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?${query}`
    );
    return response.data.items || response.data;
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default campersSlice.reducer;
