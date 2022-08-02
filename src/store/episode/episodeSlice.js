import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://bob-anime.herokuapp.com/episode';

const initialState = {
  pageOfItems: [],
  pager: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// add to favorite
export const getEpisodes = createAsyncThunk(
  'episode/getEpisodes',
  async (pageNumber, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/get/episode?page=${pageNumber}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const episodeSlice = createSlice({
  name: 'episodes',
  initialState,
  extraReducers: (builder) => {
    builder
      // add to favorite
      .addCase(getEpisodes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEpisodes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pageOfItems = action.payload.pageOfItems;
        state.pager = action.payload.pager;
      });
    //   .addCase(getEpisodes.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.message = action.payload;
    //   });
  },
});

export default episodeSlice.reducer;
