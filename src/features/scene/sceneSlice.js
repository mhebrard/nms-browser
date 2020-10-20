import { createSlice } from '@reduxjs/toolkit';

import REGIONS from '../../data/regions'
import * as d3 from '../../d3-bundle';

export const sceneSlice = createSlice({
  name: 'scene',
  initialState: {
    graphData: {
      nodes: [{id:'a'}, {id:'b'}],
      links: [{source:'a', target:'b'}]
    },
  },
  reducers: {
    setGraph: (state, action) => {
      state.graphData = action.payload;
    }
  }
});

export const { setGraph } = sceneSlice.actions;

// Utils

// Data: Load spreadsheets into array
function loadSheets(url) {
  const cors = `https://cors-anywhere.herokuapp.com/${url}`
  console.log('d3:', d3)
  return d3.tsv(cors)
    .then(data => data)
}

// Data: Load region's star system from catalogue
function getCatalogue(region) {
  console.log('Load Star Systems...')
  return loadSheets(REGIONS[region].catalogue)
  .then(data => {
    // Format nodes from catalogue
    return data.reduce((res,r) => {
      if(r['Original Name'] !== '') {
        res.push({...r, id: r['SSI']})
      }
      return res
    },[]);
  })
}

// Data: Load distances between star system
function getDistances(region) {
  console.log('Load Distances...')
  return loadSheets(REGIONS[region].distances)
  .then(data => {
    // Format links from distances
    return data.reduce((res,r) => {
      if(r['Star system A'] !== '') {
        res.push({source: r['SSI A'], target: r['SSI B'], distance: r['Distance (LY)']})
      }
      return res
    },[]);
  })
}

// Async
export const loadGraphData = region => dispatch => {
  return Promise.all([getCatalogue(region), getDistances(region)])
  .then(data => {
    console.log('loadGraph / data', data)
    dispatch(setGraph({nodes: data[0], links:data[1]}))
  })
}

// Selectors 
export const getGraph = state => state.scene.graphData;

export default sceneSlice.reducer;
