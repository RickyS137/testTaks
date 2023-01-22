import axios from 'axios'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

let URL = 'http://134.122.75.14:8666/api/v1/genre/'

export const getGenres = createAsyncThunk(
  'genres/getGenres',
  async (params) => {
    const response = await axios.get(URL,{params: params})
    return response.data
  }
)

const initialState = {
  genres: [],
  selectedGenres: '',
  load: true,
}

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setGenres(state,aciton){
      state.selectedGenres = aciton.payload
      console.log(state.selectedGenres);
    }
  },
  extraReducers:(builder)=> {
    builder
    .addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload
      state.load = false
    })
  }
})

export default genresSlice.reducer;
export const {setGenres} = genresSlice.actions