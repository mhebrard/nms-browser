import { createSelector } from 'reselect';
import { getGalaxyID, getRegion } from '../menu/menuSlice';
import { getCatalogue, getDistances } from '../startup/startupSlice';

export const getRegionSpecificSystemList = createSelector(
  [getCatalogue, getGalaxyID, getRegion], (catalogue, galaxyID, region) => {
    return catalogue[galaxyID].regions[region].systems.filter(s => s !== undefined)
  }
)

export const getRegionSpecificDistancesList = createSelector(
  [getDistances, getRegion, getRegionSpecificSystemList], (distances, region, systems) => {
    const ssiList = systems.map(s => s.ssi)
    return distances.filter(d => 
      d.sourceRegion === region 
      && d.targetRegion === region
      && ssiList.includes(d.source)
      && ssiList.includes(d.target)
    )
  }
)