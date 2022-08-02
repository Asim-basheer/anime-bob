import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// const user = JSON.parse(localStorage.getItem("user"));
const API_URL = 'https://bob-anime.herokuapp.com/anime/';

const initialState = {
  searchValue: '',
  outputValue: [],
  season: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// get result from searching
export const searchByName = createAsyncThunk(
  'search/searchByName',
  async (searchValue, thunkAPI) => {
    try {
      const { data } = await axios.get(API_URL + 'searchValue/' + searchValue);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// get result from searching
export const quickSearch = createAsyncThunk(
  'search/quickSearch',
  async (searchValue, thunkAPI) => {
    try {
      const { data } = await axios.get(API_URL + 'quicksearch/' + searchValue);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  extraReducers: (builder) => {
    builder
      // get anime
      .addCase(searchByName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.outputValue = action.payload;
      })
      .addCase(searchByName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // quickSearch
      .addCase(quickSearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(quickSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.season = action.payload;
      })
      .addCase(quickSearch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default searchSlice.reducer;
