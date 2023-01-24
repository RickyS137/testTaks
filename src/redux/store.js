import { configureStore } from '@reduxjs/toolkit';
import authAndRegSlice from './slices/authAndRegSlice';
import genresSlice from './slices/genresSlice';
import mangasSlice from './slices/mangasSlice';


export const store = configureStore({
  reducer: {
    mangas: mangasSlice,
    genres: genresSlice,
    auth: authAndRegSlice
  },
});
