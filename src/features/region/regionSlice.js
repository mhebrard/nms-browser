import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { getGalaxyID, getRegionID } from '../menu/menuSlice';
import { getCatalogue, getDistances } from '../startup/startupSlice';

export const regionSlice = createSlice({
 name: 'region',
 initialState: {
   systems: []
 },
 reducers: {
   setSystems: (state, action) => {
     state.systems = action.payload
   }
 }
})

// Actions
export const { setSystems } = regionSlice.actions;

// Selectors
export const getSystems = state => state.region.systems;

// Memorized Selectors
export const getNeighbourRegionSystemList = createSelector(
  [getCatalogue, getGalaxyID, getRegionID], (catalogue, galaxyID, regionID) => {
    // Get region list
    const regionList = catalogue[galaxyID].regions
    // Get coordinate of selected region
    const oriX = regionList[regionID].cx
    const oriY = regionList[regionID].cy
    const oriZ = regionList[regionID].cz
    // Get list of neighbouring regions
    const neighbourList = Object.keys(regionList).filter(k => (
      (oriX - 2 < regionList[k].cx) && (regionList[k].cx < oriX + 2)
      && (oriY - 2 < regionList[k].cy) && (regionList[k].cy < oriY + 2)
      && (oriZ - 2 < regionList[k].cz) && (regionList[k].cz < oriZ + 2)
    ))
    // List all systems in neighbour regions
    return Object.keys(regionList).reduce((res, r) => {
      // Get current region in the loop
      const current = regionList[r]
      // Get coordinate of current region
      const centerX = current.cx;
      const centerY = current.cy;
      const centerZ = current.cz;
      // Extract Systems and set region center
      if (neighbourList.includes(r)) {
        res = res.concat(
          current.systems.filter(s => s !== undefined).map(s => {
            const rid = s.glyphs.slice(4)
            return {...s, 
              cx: centerX - oriX, 
              cy: centerY - oriY, 
              cz: centerZ - oriZ,
              regionID: rid,
              regionName: catalogue[galaxyID].regions[rid].regionName
            }
          })
        )
      }
      return res
    }, [])
  }
)

export const getNeighbourRegionDistancesList = createSelector(
  [getDistances, getSystems], (distances, systems) => {
    const glyphList = systems.map(s => s.glyphs)
    return distances.filter(d => 
      glyphList.includes(d.source)
      && glyphList.includes(d.target)
    )
  }
)

export default regionSlice.reducer;
