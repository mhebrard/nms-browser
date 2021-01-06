import { createSelector } from 'reselect';
import { createSlice } from '@reduxjs/toolkit';
import { getCatalogue } from '../startup/startupSlice';
import { CATEGORIES } from '../../data/categories';
import { MODES, PLATFORMS } from '../../data/platforms';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    galaxyID: 0,
    region: '',
    category: CATEGORIES.star,
    platform: PLATFORMS.pc,
    mode: MODES.normal
  },
  reducers: {
    setGalaxyID: (state, action) => {
      state.galaxyID = action.payload
    },
    setRegion: (state, action) => {
      state.region = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPlatform: (state, action) => {
      state.platform = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  }
});

// Actions
export const { setGalaxyID, setRegion, setCategory, setPlatform, setMode } = menuSlice.actions;

// Selectors
export const getGalaxyID = state => state.menu.galaxyID;
export const getRegion = state => state.menu.region;
export const getCategory = state => state.menu.category;
export const getPlatform = state => state.menu.platform;
export const getMode = state => state.menu.mode;

// Memoized Selectors
export const getGalaxyList = createSelector(
  [getCatalogue], (catalogue) => {
    // Extract galaxies
    return catalogue.filter(g => g !== undefined).map(g => {
      return {
        name: g.galaxyName,
        id: g.galaxyID,
        regionCount: Object.keys(g.regions).length
      }
    })
  }
)

export const getGalaxySpecificRegionList = createSelector(
  [getCatalogue, getGalaxyID], (catalogue, galaxyID) => {
    if (galaxyID > 0) {
      const regions = catalogue[galaxyID].regions
      return Object.keys(regions).map(k => {
        return {
          name: regions[k].regionName,
          systemCount: regions[k].systems.filter(s => s !== undefined).length
        }
      })
    } else {
      return []
    }
  }
)

export default menuSlice.reducer;
