import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// const user = JSON.parse(localStorage.getItem("user"));
const API_URL = 'https://bob-anime.herokuapp.com/anime/';

const initialState = {
  animes: [],
  episodes: [],
  anime: {},
  genre: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// get anime
export const getAnimes = createAsyncThunk('anime/get', async (thunkAPI) => {
  try {
    const { data } = await axios.get(API_URL + 'get');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getOneAnime = createAsyncThunk(
  'anime/getOneAnime',
  async (anime_id, thunkAPI) => {
    try {
      const { data } = await axios.get(API_URL + 'get/' + anime_id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getEpisodes = createAsyncThunk(
  'anime/getEpisodes',
  async (anime_id, thunkAPI) => {
    try {
      const { data } = await axios.get(
        'https://bob-anime.herokuapp.com/test/' + anime_id
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  extraReducers: (builder) => {
    builder
      // get anime
      .addCase(getAnimes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnimes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.animes = action.payload;
      })
      .addCase(getAnimes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // getEpisodes
      .addCase(getEpisodes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEpisodes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.episodes = action.payload;
      })
      .addCase(getEpisodes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // getOneAnime
      .addCase(getOneAnime.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneAnime.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.anime = action.payload;
      })
      .addCase(getOneAnime.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default animeSlice.reducer;
