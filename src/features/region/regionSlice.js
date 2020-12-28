import { createSelector } from 'reselect';
import { getRegion } from '../menu/menuSlice';
import { getCatalogue, getDistances } from '../startup/startupSlice';

export const getRegionSpecificSystemList = createSelector(
  [getCatalogue, getRegion], (catalogue, region) => {
    const systemMap = catalogue.reduce((res,r) => {
      // Filter region only 
      if (r.region === region) {
        // Prioritize PC > PS4 > Xbox
        if (res[r.ssi] === undefined || r.platform === 'PC') {
          res[r.ssi] = r
        } else if (res[r.ssi].platform !== 'PC' && res[r.ssi].platform !== 'PS4') {
          res[r.ssi] = r
        }
      }
      return res
    },{})
    return Object.keys(systemMap).map(k => systemMap[k])
  }
)

export const getRegionSpecificDistancesList = createSelector(
  [getDistances, getRegion, getRegionSpecificSystemList], (distances, region, systems) => {
    // Get system name map
    const systemNameMap = systems.reduce((res,r) => {
      res[r.systemName] = 0
      return res
    },{})
    // console.log('map', systemNameMap)
    // Filter links by region + system name
    
    return distances.filter(d => {
      // console.log(d, d.region == region, )
      return (
      d.region === region 
      && systemNameMap[d.sourceName] !== undefined
      && systemNameMap[d.targetName] !== undefined
      )
    })
  }
)