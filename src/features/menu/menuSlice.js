import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    region: '',
  },
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload
    }
  }
});

// Actions
export const { setRegion } = menuSlice.actions;

// Selectors
export const getRegion = state => state.menu.region;

export default menuSlice.reducer;
