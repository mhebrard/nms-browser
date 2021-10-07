import { createSlice } from '@reduxjs/toolkit';

export const galaxyInfoSlice = createSlice({
  name: 'galaxyinfo',
  initialState: {
    collapse: true,
    node: ''
  },
  reducers: {
    toggle: (state, action) => {
      state.collapse = !state.collapse;
    },
    setNode: (state, action) => {
      state.node = action.payload
    },
    collapseInfo: (state, action) => {
      state.collapse = true
    }
  }
})

//Actions
export const {toggle, setNode, collapseInfo} = galaxyInfoSlice.actions

// Selectors 
export const isCollapse = state => state.galaxyinfo.collapse;
export const getNode = state => state.galaxyinfo.node;

export default galaxyInfoSlice.reducer;
