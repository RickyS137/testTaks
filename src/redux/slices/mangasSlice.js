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
  async (params) => {
    const response = await axios.get(URL,{ params: params });
    // dispatch(getMangasByType(response.data))
    return response.data
  }
);

export const getMangasByGenres = createAsyncThunk(
  'mangaByGenres/getMangasByGenres',
  async (params) => {
    const response = await axios.get(URL, { params: params });
    return response.data;
  }
);

const initialState = {
  mangas: {
    count: 0,
    results: [],
  },
  mangasByType: [],
  mangasByYears : [],
  types: '',
  load: true,
  startYear: 0,
  endYear: 2022,
};

const mangasSlice = createSlice({
  name: 'mangas',
  initialState,
  reducers: {
    setStartYear(state, action){
      state.startYear = action.payload
    },
    setEndYear(state, action){
      state.endYear = action.payload
    },
    setMangasByType(state, action){
      state.mangasByType = action.payload
    },
    setResults(state,action){
      state.mangas.results = action.payload
    },
    setMangasByYear(state, action){
      state.mangasByYears = action.payload
    },
    setTypes(state,action){
      state.types = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getMangasByGenres.fulfilled, (state,action) => {
      state.mangas = action.payload
      state.load = false
    })
    .addCase(getMangas.fulfilled, (state, action) => {
      state.mangas = action.payload;
      state.load = false;
    })
    .addCase(getMangasByTypes.fulfilled, (state, action) => {
      state.mangasByType = action.payload
      state.load = false
    })
  },
});

export default mangasSlice.reducer;
export const {setMangasByType,
    setStartYear,
    setEndYear,
    setResults,
    setMangasByYear,
    setTypes
    } = mangasSlice.actions
