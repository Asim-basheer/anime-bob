import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const user = JSON.parse(localStorage.getItem('user'));
const API_URL = 'https://bob-anime.herokuapp.com/favorite/';

const initialState = {
  favorites: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// get result from searching
export const getFavorites = createAsyncThunk(
  'paginate/getFavorites',
  async (thunkAPI) => {
    try {
      if (user) {
        const { data } = await axios.get(API_URL + 'get/' + user.user_id);
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// get result from searching
export const deleteFromFavorite = createAsyncThunk(
  'paginate/deleteFromFavorite',
  async (body, thunkAPI) => {
    try {
      if (user) {
        const { data } = await axios.post(API_URL + 'delete', body);
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// get result from searching
export const addToFavorite = createAsyncThunk(
  'paginate/addToFavorite',
  async (body, thunkAPI) => {
    try {
      if (user) {
        const { data } = await axios.post(API_URL + 'add', body);
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  extraReducers: (builder) => {
    builder
      // get anime
      .addCase(getFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favorites = action.payload;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default favoriteSlice.reducer;
