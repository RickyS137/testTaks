import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const URL = 'http://134.122.75.14:8666/api/v1/manga/';

export const getMangas = createAsyncThunk(
  'mangas/getMangas',
  async (params) => {
    const response = await axios.get(URL, { params: params });
    return response.data;
  }
);

export const getMangasByTypes = createAsyncThunk(
  'mangaByTypes/getMangasByTypes',
  async (params,{dispatch}) => {
    const response = await axios.get(URL,{ params: params });
    dispatch(getMangasByType(response.data))
  }
);

const initialState = {
  mangas: {
    count: 0,
    results: [],
  },
  mangasByType: [],
  load: true,
};

const mangasSlice = createSlice({
  name: 'mangas',
  initialState,
  reducers: {
    getMangasByType(state, action){
      state.mangasByType = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMangas.fulfilled, (state, action) => {
      state.mangas = action.payload;
      state.load = false;
    });
  },
});

export default mangasSlice.reducer;
export const {getMangasByType} = mangasSlice.actions
