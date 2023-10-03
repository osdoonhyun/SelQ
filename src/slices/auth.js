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
    builder.addCase(getUserInfo.rejected, async (state, action) => {
      console.log('유저정보 가져오기 실패!');
      // accessToken 만료시 토큰 재발급 로직
      if (action.error.message === 'Request failed with status code 401') {
        const refreshToken = getCookie('Refresh');
        const config = {
          headers: {
            Authorization: 'Bearer ' + refreshToken,
          },
        };
        try {
          const { status } = await serverApi.get('/auth/refresh', config);

          if (status === 200) {
            const newAccessToken = getCookie('Authentication');
            sessionStorage.setItem('accessToken', newAccessToken);

            return await getUserInfo();
          }
        } catch (error) {
          console.error('AccessToken 재발급 실패:', error);
          alert('로그인을 다시 해주세요.');
        }
      }

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
