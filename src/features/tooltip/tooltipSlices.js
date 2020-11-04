import { createSlice } from '@reduxjs/toolkit';

export const tooltipSlice = createSlice({
  name: 'tooltip',
  initialState: {
    isVisible: false,
    node: '',
    position: {x:0, y:0}
  },
  reducers: {
    setVisibility: (state, action) => {
      state.isVisible = action.payload
    },
    setNode: (state, action) => {
      state.node = action.payload
    },
    setPosition: (state, action) => {
      state.position = action.payload
    }
  }
})

//Actions
export const {setVisibility, setNode, setPosition} = tooltipSlice.actions

// Selectors 
export const isVisible = state => state.tooltip.isVisible;
export const getNode = state => state.tooltip.node;
export const getPosition = state => state.tooltip.position;

export default tooltipSlice.reducer;
