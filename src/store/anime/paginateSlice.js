import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// const user = JSON.parse(localStorage.getItem("user"));
// const API_URL = "https://bob-anime.herokuapp.com/paginate";

const initialState = {
  pager: {},
  pageOfItems: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// get result from searching
export const getPaginateAnime = createAsyncThunk(
  'paginate/getPaginateAnime',
  async (page, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `https://bob-anime.herokuapp.com/paginate?page=${page}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const paginateSlice = createSlice({
  name: 'paginate',
  initialState,
  extraReducers: (builder) => {
    builder
      // get anime
      .addCase(getPaginateAnime.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaginateAnime.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pager = action.payload.pager;
        state.pageOfItems = action.payload.pageOfItems;
      })
      .addCase(getPaginateAnime.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default paginateSlice.reducer;
