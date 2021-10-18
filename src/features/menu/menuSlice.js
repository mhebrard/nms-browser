import { createSelector } from 'reselect';
import { createSlice } from '@reduxjs/toolkit';
import { getCatalogue } from '../startup/startupSlice';
import { CATEGORIES } from '../../data/categories';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    galaxyID: 0,
    galaxyQuery: '',
    regionID: '',
    regionQuery: '',
    category: CATEGORIES.star,
    collapse: true
  },
  reducers: {
    setGalaxyID: (state, action) => {
      state.galaxyID = action.payload
    },
    setGalaxyQuery: (state, action) => {
      state.galaxyQuery = action.payload
    },
    setRegionID: (state, action) => {
      state.regionID = action.payload
    },
    setRegionQuery: (state, action) => {
      state.regionQuery = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    toggle: (state, action) => {
      state.collapse = !state.collapse;
    },
    collapseMenu: (state, action) => {
      state.collapse = true
    }
  }
});

// Actions
export const { setGalaxyID, setGalaxyQuery, setRegionID, setRegionQuery, setCategory, toggle, collapseMenu} = menuSlice.actions;

// Selectors
export const getGalaxyID = state => state.menu.galaxyID;
export const getGalaxyQuery = state => state.menu.galaxyQuery;
export const getRegionID = state => state.menu.regionID;
export const getRegionQuery = state => state.menu.regionQuery;
export const getCategory = state => state.menu.category;
export const isCollapse = state => state.menu.collapse;

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
          id: k,
          cx: regions[k].cx,
          cy: regions[k].cy,
          cz: regions[k].cz,
          systemCount: regions[k].systems.filter(s => s !== undefined).length
        }
      }).sort((a, b) => a.name.localeCompare(b.name))
    } else {
      return []
    }
  }
)

export default menuSlice.reducer;
