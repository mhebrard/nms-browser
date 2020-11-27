import { createSlice } from '@reduxjs/toolkit';

import { CATALOGUE } from '../../data/assets'
import * as d3 from '../../d3-bundle';

export const startupSlice = createSlice({
  name: 'startup',
  initialState: {
    catalogue: []
  },
  reducers: {
    setCatalogue: (state, action) => {
      state.catalogue = action.payload;
    }
  }
});

export const { setCatalogue } = startupSlice.actions;

// Utils

// Data: Load spreadsheets into array
function loadSheets(url) {
  const cors = `https://cors-anywhere.herokuapp.com/${url}`
  // console.log('d3:', d3)
  return d3.tsv(cors)
    .then(data => data)
}

// Data: Load region's star system from catalogue
function loadCatalogue() {
  console.log('Load Star Systems...')
  return loadSheets(CATALOGUE)
  .then(data => {
    // console.log('raw catalogue:', data)
    // Format nodes from catalogue
    return data.reduce((res,r) => {
      // 62: "Lock Record?""
      if(r[62] == 'Y') {
        res.push({
          SystemName: r[1],
          Coordinates: r[6],
          Glyphs: r[7],
          DiscoveredBy: r[10],
          DiscoveryDate: r[13],
          SurveyDate: r[14],
          Civilized: r[17],
          Bases: r[19],
          Platform: r[20],
          Mode: r[21],
          StarCount: r[22],
          StarClass: r[23],
          StarColor: r[24],
          PlanetCount: r[25],
          MoonCount: r[26],
          Faction: r[27],
          LY: r[29],
          Water: r[30],
          Economy: r[31],
          Wealth: r[32],
          Buy: r[33.0],
          Sell: r[34.0],
          Conflict: r[35],
          Release: r[36],
          X: r[58],
          Y: r[59],
          Z: r[60],
          SSI: r[61],
          Locked: r[62],
          Phantom: r[64],
          Wiki: r[67],
          Research: r[74],
          Galaxy: r[76],
          Region: r[77]
        })
      }
      return res
    },[]);
  })
}

// Async
export const loadData = () => dispatch => {
  // return Promise.all([loadCatalogue(region), getDistances(region)])
  return loadCatalogue()
  .then(data => {
    console.log('loadData / catalogue', data)
    dispatch(setCatalogue(data))
  })
}

// Selectors 
export const getCatalogue = state => state.startup.catalogue;

export default startupSlice.reducer;
