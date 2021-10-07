import { createSelector } from 'reselect';
import { createSlice } from '@reduxjs/toolkit';
import { getCatalogue } from '../startup/startupSlice';
import { getGalaxyID } from '../menu/menuSlice';

export const galaxySlice = createSlice({
  name: 'galaxy',
  initialState: {
    clusters: []
  },
  reducers: {
    setClusters: (state, action) => {
      state.clusters = action.payload
    }
  }
});

// Actions
export const { setClusters } = galaxySlice.actions;

// Selectors
export const getClusters = state => state.galaxy.clusters;

// Memoized Selectors
export const getRegionClusters = createSelector(
  [getCatalogue, getGalaxyID], (catalogue, galaxyID) => {
    const lod = 50 // Level Of Details: range in which regions will be aggregated into one cluster
    let clustersMap = {}
    if (galaxyID > 0) {
      const regions = catalogue[galaxyID].regions
      // Consolidate regions by clusters according to LOD
      clustersMap = Object.keys(regions).reduce((res, k) => {
        const x = Math.round(regions[k].cx / lod)
        const y = Math.round(regions[k].cy / lod)
        const z = Math.round(regions[k].cz / lod)
        const id = `${x}_${y}_${z}`
        if (!res[id]) {
          res[id] = {
            id,
            x,
            y,
            z,
            galaxyID,
            galaxyName: catalogue[galaxyID].galaxyName,
            regions: [], }
        }
        res[id].regions.push({id: k, name: regions[k].regionName})
        res[id].name = `Cluster ${id}: ${res[id].regions.length} documented region(s)`
        return res
      }, {})
    } // and galaxyID
    // Add center
    const x = Math.round(2027 / lod)
    const y = Math.round(127 / lod)
    const z = Math.round(2027 / lod)
    const id = `${x}_${y}_${z}`
    if (!clustersMap[id]) { clustersMap[id] = {id, x, y, z, regions: []} }
    clustersMap[id].name = `Galaxy Center: ${clustersMap[id].regions.length} documented region(s)`

    return Object.keys(clustersMap).map(k => clustersMap[k])
  }
)

export default galaxySlice.reducer;
