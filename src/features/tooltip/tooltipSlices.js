import { createSlice } from '@reduxjs/toolkit';

export const tooltipSlice = createSlice({
  name: 'tooltip',
  initialState: {
    collapse: true,
    node: '',
    position: {x:0, y:0}
  },
  reducers: {
    toggle: (state, action) => {
      state.collapse = !state.collapse;
    },
    setNode: (state, action) => {
      state.node = action.payload
    },
    setPosition: (state, action) => {
      state.position = action.payload
    },
    collapseTooltip: (state, action) => {
      state.collapse = true
    }
  }
})

//Actions
export const {toggle, setNode, setPosition, collapseTooltip} = tooltipSlice.actions

// Selectors 
export const isCollapse = state => state.tooltip.collapse;
export const getNode = state => state.tooltip.node;
export const getPosition = state => state.tooltip.position;

export default tooltipSlice.reducer;
