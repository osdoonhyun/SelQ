import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serverApi } from '../services/api';
import { getCookie, removeCookie } from '../config/cookie';

const logIn = createAsyncThunk('user/logIn', async (userInput) => {
  try {
    const { status } = await serverApi.post('/auth/login', userInput);

    if (status === 200) {
      return getCookie('Authentication');
    }
  } catch (error) {
    throw error?.response?.data?.message;
  }
});

const getUserInfo = createAsyncThunk('user/userInfo', async () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  try {
    const { data, status } = await serverApi.get('/auth', config);

    if (status === 200) {
      return { userInfo: data.body, token: accessToken };
    }
  } catch (error) {
    console.log('Get User Info Error', error.message);
    throw error;
  }
});

const logOut = createAsyncThunk('user/logOut', () => {
  sessionStorage.removeItem('accessToken');
  // removeCookie('Authentication');
});

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      sessionStorage.setItem('accessToken', action.payload);
      console.log('로그인 성공!');
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;

      console.log('로그인 실패!');
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.userInfo;
      state.token = action.payload.token;
      console.log('유저정보 가져오기 성공!', action);
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      console.log('유저정보 가져오기 실패!');
      state.isLoggedIn = false;
      state.user = null;
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      console.log('로그아웃!!');
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});

export { userSlice, getUserInfo, logIn, logOut };
