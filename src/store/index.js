import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './Slices/auth';
import { bookmarkSlice } from './Slices/bookmark';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    bookmark: bookmarkSlice.reducer,
  },
});

export default store;
