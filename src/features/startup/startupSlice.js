import { createSlice } from '@reduxjs/toolkit';

export const startupSlice = createSlice({
  name: 'startup',
  initialState: {
    status: 'NoData',
    catalogue: [],
    distances: []
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setCatalogue: (state, action) => {
      state.catalogue = action.payload
    },
    setDistances: (state, action) => {
      state.distances = action.payload
    }
  }
});

export const { setStatus, setCatalogue, setDistances } = startupSlice.actions

// Selectors
export const getStatus = state => state.startup.status
export const getCatalogue = state => state.startup.catalogue
export const getDistances = state => state.startup.distances

export default startupSlice.reducer
