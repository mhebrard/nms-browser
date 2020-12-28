import { createSelector } from 'reselect';
import { createSlice } from '@reduxjs/toolkit';
import { getCatalogue } from '../startup/startupSlice';
import { CATEGORIES } from '../../data/categories';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    galaxy: '',
    region: '',
    category: CATEGORIES.star
  },
  reducers: {
    setGalaxy: (state, action) => {
      state.galaxy = action.payload
    },
    setRegion: (state, action) => {
      state.region = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  }
});

// Actions
export const { setGalaxy, setRegion, setCategory } = menuSlice.actions;

// Selectors
export const getGalaxy = state => state.menu.galaxy;
export const getRegion = state => state.menu.region;
export const getCategory = state => state.menu.category;

// Memoized Selectors
export const getGalaxyList = createSelector(
  [getCatalogue], (catalogue) => {
    // Extract galaxies
    const galaxyMap = catalogue.reduce((res, r) => {
      if (!res[r.galaxyID] && r.galaxyID > 0) {
        res[r.galaxyID] = {
          id: r.galaxyID,
          name: r.galaxy,
          systemCount: 0
        }
      }
      if (r.galaxyID > 0) {
        res[r.galaxyID].systemCount++
      }
      return res
    },{})
    // Sort galaxies by ID
    return Object.keys(galaxyMap).sort((a, b) => parseInt(a) - parseInt(b)).map(id => galaxyMap[id])
  }
)

export const getGalaxySpecificRegionList = createSelector(
  [getCatalogue, getGalaxy], (catalogue, galaxy) => {
    const regionMap = catalogue
      .filter(f => f.galaxy == galaxy)
      .reduce((res, r) => {
      if (!res[r.region]) { res[r.region]=0 }
      res[r.region]++
      return res
    },{})
    return Object.keys(regionMap).sort().map(d => {return {name: d, systemCount: regionMap[d]} })
  }
)

export default menuSlice.reducer;
