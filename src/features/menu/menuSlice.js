import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { createSlice } from '@reduxjs/toolkit';
import { getCatalogue } from '../startup/startupSlice';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    galaxy: '',
    region: '',
  },
  reducers: {
    setGalaxy: (state, action) => {
      state.galaxy = action.payload
    },
    setRegion: (state, action) => {
      state.region = action.payload
    }
  }
});

// Actions
export const { setGalaxy, subsetRegionList, setRegion } = menuSlice.actions;

// Selectors
export const getGalaxy = state => state.menu.galaxy;
export const getRegion = state => state.menu.region;

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
    console.log('getGalaxySpecificRegionList', catalogue, galaxy, regionMap)
    return Object.keys(regionMap).sort()
  }
)

export default menuSlice.reducer;
