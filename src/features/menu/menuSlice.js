import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { createSlice } from '@reduxjs/toolkit';
import { getCatalogue } from '../startup/startupSlice';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    galaxyList: [],
    galaxy: '',
    regionList: [],
    region: '',
  },
  reducers: {
    setGalaxyList: (state, action) => {
      state.galaxyList = action.payload
    },
    setGalaxy: (state, action) => {
      state.galaxy = action.payload
    },
    setRegionList: (state, action) => {
      state.regionList = action.payload
    },
    setRegion: (state, action) => {
      state.region = action.payload
    }
  }
});

// Actions
export const { setGalaxyList, setGalaxy, setRegionList, subsetRegionList, setRegion } = menuSlice.actions;

// Selectors
export const getGalaxyList = state => state.menu.galaxyList;
export const getGalaxy = state => state.menu.galaxy;
export const getRegionList = state => state.menu.regionList;
export const getRegion = state => state.menu.region;

// Memoized Selectors
export const getGalaxySpecificRegionList = createSelector(
  [getCatalogue, getGalaxy], (catalogue, galaxy) => {
    const regionMap = catalogue
      .filter(f => f.Galaxy == galaxy)
      .reduce((res, r) => {
      if (!res[r.Region]) { res[r.Region]=0 }
      res[r.Region]++
      return res
    },{})
    return Object.keys(regionMap).sort()
  }
)

export default menuSlice.reducer;
