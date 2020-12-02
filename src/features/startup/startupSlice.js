import { createSlice } from '@reduxjs/toolkit';

export const startupSlice = createSlice({
  name: 'startup',
  initialState: {
    status: 'Empty',
    catalogue: []
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setCatalogue: (state, action) => {
      state.catalogue = action.payload
    }
  }
});

export const { setStatus, setCatalogue } = startupSlice.actions

// Selectors
export const getStatus = state => state.startup.status
export const getCatalogue = state => state.startup.catalogue

export default startupSlice.reducer
