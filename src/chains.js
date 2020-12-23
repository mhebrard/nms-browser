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
    console.log('chain / loadCatalogue', data)
    // Get keys
    const keyMap = {}
    Object.keys(data[0]).forEach(k => keyMap[data[0][k]] = k)
    // Format nodes from catalogue
    return data.reduce((res,r) => {
      // Filter Locked record only
      if(r[keyMap['Lock Record?']] == 'Y') {
        res.push({
          systemName: r[keyMap['System Name (Unique entry search key)']],
          coordinates: r[keyMap['Galactic Coordinates']],
          glyphs: r[keyMap['Glyph Code']],
          discoveredBy: r[keyMap['Discovered by']],
          discoveryDate: r[keyMap['Discovery Date']],
          surveyDate: r[keyMap['Survey Date']],
          civilized: r[keyMap['Civilized?']],
          bases: r[keyMap['Bases']],
          platform: r[keyMap['Platform']],
          mode: r[keyMap['Mode']],
          starCount: r[keyMap['Multiple stars?']],
          starClass: r[keyMap['Category']],
          starColor: r[keyMap['Color']],
          planetCount: r[keyMap['# of planets']],
          moonCount: r[keyMap['# of moons']],
          faction: r[keyMap['Faction']],
          ly: r[keyMap['LY from center (auto estimate)']],
          water: r[keyMap['Water (Y/N)']],
          economy: r[keyMap['Economy']],
          wealth: r[keyMap['Wealth']],
          buy: r[keyMap['e-buy']],
          sell: r[keyMap['E-Sell']],
          conflict: r[keyMap['Conflict']],
          release: r[keyMap['Release']],
          cx: r[keyMap['X coord']],
          cy: r[keyMap['Y coord']],
          cz: r[keyMap['Z coord']],
          ssi: r[keyMap['System ID']],
          locked: r[keyMap['Lock Record?']],
          phantom: r[keyMap['Phantom System?']],
          wiki: r[keyMap['NMS wiki Link']],
          age: r[keyMap['Star System Age (billions of years)']],
          research: r[keyMap['Researchteam']],
          galaxy: r[keyMap['Galaxy']],
          galaxyID: r[keyMap['GalaxyID']],
          region: r[keyMap['Region']]
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