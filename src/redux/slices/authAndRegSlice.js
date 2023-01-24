import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const usersURL = 'http://134.122.75.14:8666/api/auth/profile/';
const regURL = 'http://134.122.75.14:8666/api/auth/signup/';
const logURL = 'http://134.122.75.14:8666/api/auth/signin/';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await axios.get(usersURL);
  return response.data;
});

export const registration = createAsyncThunk('registration', async (data) => {
  const response = await axios
    .post(regURL, data, {
      headers: { 'Content-type': 'multipart/form-data' },
    })
    .then(response => console.log(response))
    .catch((err) => console.log(err));
  return response;
});

export const autharization = createAsyncThunk(
  'autharization',
  async (data, { dispatch }) => {
    const response = await axios
      .post(logURL, data)
      .then((response) => {
        localStorage.setItem('tokenAccess', response.data.access);
        localStorage.setItem('tokenRefresh', response.data.refresh);
        dispatch(setLogined(true));
        localStorage.setItem('logined',true)
      })
      .catch((err) => console.log(err));
    return response;
  }
);

export const logOutAcc = createAsyncThunk(
  "logOutAcc",
  async (data,{dispatch}) => {
    try {
      await axios.post(`http://134.122.75.14:8666/api/auth/logout/`, {params : data}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenAccess"))}`,
        },
      });
      dispatch(setLogOut());
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  logined: false,
  users: [],
  dataLog: {
    "username": '',
    "password": ''
  },
};

const authAndRegSlice = createSlice({
  name: 'authAndReg',
  initialState,
  reducers: {
    setLUsername(state,action){
      state.dataLog.username = action.payload
    },
    setLPassword(state,action){
      state.dataLog.password = action.payload
    },
    setLogined(state, action) {
      state.logined = action.payload;
    },
    setLogOut(state){
      state.logined = false
    }
  },
  extraReducers(builder) {
    builder
    .addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    })
  },
});

export default authAndRegSlice.reducer;
export const { setLogined , setAccount , setLUsername , setLPassword, setLogOut} = authAndRegSlice.actions;
