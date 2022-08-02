import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/authSlice';
import anime from './anime/animeSlice';
import search from './anime/searchSlice';
import paginate from './anime/paginateSlice';
import admin from './admin/adminSlice';
import episode from './episode/episodeSlice';
import favorite from './anime/favoriteSlice';
export default configureStore({
  reducer: {
    auth,
    anime,
    search,
    paginate,
    admin,
    episode,
    favorite,
  },
});
