import { configureStore } from '@reduxjs/toolkit';
import genresSlice from './slices/genresSlice';
import mangasSlice from './slices/mangasSlice';


export const store = configureStore({
  reducer: {
    mangas: mangasSlice,
    genres: genresSlice
  },
});
