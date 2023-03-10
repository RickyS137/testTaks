import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const URL = 'http://134.122.75.14:8666/api/v1/manga/';
const topURL = 'http://134.122.75.14:8666/api/v1/top-manga/'

export const postComm = createAsyncThunk(
  'postComm',
  async (data) => {
    const {id,text} = data
    console.log(id,text);
    console.log(URL+data?.id,+'/add-comment/'+{text: data?.text});
    const response = await axios.post(`http://134.122.75.14:8666/api/v1/manga/${id}/add-comment/`,text,{
      headers:{
      "Authorization": `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("tokenAccess")))}`},
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
    return response
  }
);

export const getMangas = createAsyncThunk(
  'mangas/getMangas',
  async (params) => {
    const response = await axios.get(URL, { params: params });
    return response.data;
  }
);
export const getTopMangas = createAsyncThunk(
  'topMangas/getTopMangas',
  async (params) => {
    const response = await axios.get(topURL,{params: params});
    return response.data;
  }
);

export const searchManga = createAsyncThunk(
  'search/searchManga',
  async (params) => {
    const response = await axios.get(topURL, { params: params });
    return response.data;
  }
);

export const getMangasByTypes = createAsyncThunk(
  'mangaByTypes/getMangasByTypes',
  async (params) => {
    const response = await axios.get(URL,{ params: params });
    return response.data
  }
);

export const getMangasByGenres = createAsyncThunk(
  'mangaByGenres/getMangasByGenres',
  async (params) => {
    const response = await axios.get(URL, { params: params });
    return response.data
  }
);


export const getManga = createAsyncThunk(
  'manga/getManga',
  async (id) => {
    const response = await axios.get(URL+id);
    return response.data
  }
);

export const getComments = createAsyncThunk(
  "mangaComments/getComments",
  async (id) => {
    const response = await axios.get(`${URL+id}/comments/`);
    return response.data
  }
);

const initialState = {
  search: [],
  searchText: '',
  mangas: {
    count: 0,
    results: [],
  },
  topMangas: {
    count: 0,
    results: []
  },
  mangaComments: [],
  manga: {
    comments_count: 0,
    results: {}
  },
  mangaId: 212,
  mangasByType: {
    count: 0,
    results: []
} ,
  mangasByYears : [],
  mangaByGenres: {
    count: 0,
    results: []
  },
  types: '',
  load: true,
  startYear: 0,
  endYear: 0,
  users: [],
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
      state.mangas = action.payload
    },
    setMangasByYear(state, action){
      state.mangasByYears = action.payload
    },
    setTypes(state,action){
      state.types = action.payload
    },
    setManga(state,action){
      state.manga = action.payload
    },
    setMangaId(state,action){
      state.mangaId = action.payload
    },
    setMangaByGenre(state, action){
      state.mangaByGenres = action.payload
    },
    setSearch(state,action){
      state.searchText = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(searchManga.fulfilled, (state,action) => {
      state.search = action.payload
      state.load = false
    })
    .addCase(getMangasByGenres.fulfilled, (state, action) => {
      state.mangaByGenres = action.payload
      state.load = false
    })
    .addCase(getMangasByGenres.pending, (state) => {
      state.load = true
    })
    .addCase(getMangas.fulfilled, (state, action) => {
      state.mangas = action.payload;
      state.load = false;
    })
    .addCase(getMangas.pending, (state) => {
      state.load = true;
    })
    .addCase(getTopMangas.fulfilled, (state, action) => {
      state.topMangas = action.payload;
      state.load = false;
    })
    .addCase(getTopMangas.pending, (state) => {
      state.load = true;
    })
    .addCase(getMangasByTypes.fulfilled, (state, action) => {
      state.mangasByType = action.payload
      state.load = false
    })
    .addCase(getMangasByTypes.pending, (state) => {
      state.load = true
    })
    .addCase(getManga.fulfilled, (state,action) => {
      state.manga = action.payload
      state.load = false
    })
    .addCase(getManga.pending, (state) => {
      state.load = true
    })
    .addCase(getComments.fulfilled, (state,action) => {
      state.mangaComments = action.payload
      state.load = false
    })
    .addCase(getComments.pending, (state) => {
      state.load = true
    })
  },
});

export default mangasSlice.reducer;
export const {setMangasByType,
    setSearch,
    setMangaByGenre,
    setMangaId,
    setStartYear,
    setEndYear,
    setResults,
    setMangasByYear,
    setTypes,
    setManga,
    } = mangasSlice.actions
