import { setCatalogue, setStatus } from './features/startup/startupSlice'
import { setGalaxy, setGalaxyList, subsetRegionList } from './features/menu/menuSlice'
import { CATALOGUE } from './data/assets'
import * as d3 from './d3-bundle';

// Data: Load spreadsheets into array
function loadSheets(url) {
  const cors = `https://cors-anywhere.herokuapp.com/${url}`
  // console.log('d3:', d3)
  return d3.tsv(cors)
    .then(data => data)
}

// Data: Load region's star system from catalogue
function loadCatalogue() {
  console.log('Load star systems catalogue...')
  return loadSheets(CATALOGUE)
  .then(data => {
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

export const loadData = () => dispatch => {
  // return Promise.all([loadCatalogue(region), getDistances(region)])
  dispatch(setStatus('Loading'))
  return loadCatalogue()
  .then(data => {
    console.log('loadData / catalogue', data)
    // Save full catalogue
    dispatch(setCatalogue(data))
    dispatch(setStatus('Full'))
    // Extract galaxy list
    const galaxyMap = data.reduce((res, r) => {
      if(!res[r.Galaxy]) { res[r.Galaxy] = 0 }
      res[r.Galaxy]++
      return res
    },{})
    dispatch(setGalaxyList(Object.keys(galaxyMap)))
  })
}

export const changeGalaxy = galaxy => dispatch => {
  // Display galaxy scene
  dispatch(setStatus('Galaxy'))
  // Set Menu
  dispatch(setGalaxy(galaxy))
}

export const changeRegion = region => dispatch => {
  // Display galaxy scene
  dispatch(setStatus('Region'))
}