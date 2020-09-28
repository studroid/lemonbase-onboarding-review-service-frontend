import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    authData: JSON.parse(localStorage.getItem('authData')),
  },
  reducers: {
    setAuthentication: (state, action) => {
      state.authData = action.payload;
    },
  },
});

export const selectAuthData = state => state.user.authData;

export const {setAuthentication} = userSlice.actions;

export default userSlice.reducer;
