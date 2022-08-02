import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// const user = JSON.parse(localStorage.getItem("user"));
const API_URL = 'https://bob-anime.herokuapp.com/anime/';
const API_URL_EP = 'https://bob-anime.herokuapp.com/episode/';
const API_URL_USER = 'https://bob-anime.herokuapp.com/users/';
const initialState = {
  genre: [],
  anime: {},
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// get result from searching
export const getGenres = createAsyncThunk(
  'admin/getGenres',
  async (thunkAPI) => {
    try {
      const { data } = await axios.get(API_URL + 'genres');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addAnime = createAsyncThunk(
  'admin/addAnime',
  async (values, thunkAPI) => {
    try {
      const { data } = await axios.post(API_URL + 'post', values);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAnime = createAsyncThunk(
  'admin/updateAnime',
  async (anime, thunkAPI) => {
    const { body, anime_id } = anime;
    try {
      const { data } = await axios.put(API_URL + 'update/' + anime_id, body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAnime = createAsyncThunk(
  'admin/deleteAnime',
  async (anime_id, thunkAPI) => {
    try {
      const { data } = await axios.delete(API_URL + 'delete/' + anime_id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addEpisode = createAsyncThunk(
  'admin/addEpisode',
  async (values, thunkAPI) => {
    try {
      const { data } = await axios.post(API_URL_EP + 'post', values);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteEpisode = createAsyncThunk(
  'admin/deleteEpisode',
  async (episode_id, thunkAPI) => {
    try {
      const { data } = await axios.delete(API_URL_EP + 'delete/' + episode_id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editEpisode = createAsyncThunk(
  'admin/deleteEpisode',
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.put(API_URL_EP + 'edit', body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUsers = createAsyncThunk('admin/getUsers', async (thunkAPI) => {
  try {
    const { data } = await axios.get(API_URL_USER + 'get');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (user_id, thunkAPI) => {
    try {
      await axios.delete(API_URL_USER + 'delete/' + user_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editUser = createAsyncThunk(
  'admin/editUser',
  async (body, thunkAPI) => {
    try {
      await axios.put(API_URL_USER + 'edit', body);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  extraReducers: (builder) => {
    builder
      // get anime
      .addCase(getGenres.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.genre = action.payload;
      })

      .addCase(addAnime.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAnime.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.anime = action.payload;
      })
      .addCase(addAnime.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // get users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default adminSlice.reducer;
