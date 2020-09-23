import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')),
  },
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const selectIsAuthenticated = state => state.user.isAuthenticated;

export const {setAuthentication} = userSlice.actions;

export default userSlice.reducer;
