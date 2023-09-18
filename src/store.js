import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/auth';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
