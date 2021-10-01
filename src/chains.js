import { setCatalogue, setDistances, setStatus } from './features/startup/startupSlice'
import { setGalaxyID, setRegionID } from './features/menu/menuSlice'
import { CATALOGUE, INTERREGION, INTRAREGION } from './data/assets'
import * as d3 from './d3-bundle';

// Data: Load spreadsheets into array
function loadSheets(url) {
  // console.log('d3:', d3)
  // d3.csv("/path/to/file.csv")
  // .header("header-name", "header-value")
  // Access-Control-Allow-Origin: *.
  return d3.tsv(url)
    .then(data => data)
}

// Data: Load region's star system from catalogue
function loadCatalogue(url) {
  console.log('Load star systems catalogue...')
  return loadSheets(url)
  .then(data => {
    console.log('chain / loadCatalogue OK')
    // Get keys
    const keyMap = {}
    Object.keys(data[0]).forEach(k => keyMap[data[0][k]] = k)
    // Format nodes from catalogue
    return data.reduce((res,r) => {
      // Filter Locked record only
      if(r[keyMap['Lock Record?']] === 'Y' && r[keyMap['Phantom System?']] !== 'Y' && r[keyMap['GalaxyID']] !== 'Null' && r[keyMap['Glyph Code']] !== '') {
        // Galaxy > Region > Star indexed by SystemID
        // Set galaxy
        if (res[r[keyMap['GalaxyID']]] === undefined) {
          res[r[keyMap['GalaxyID']]] = {
            galaxyName: r[keyMap['Galaxy']],
            galaxyID: r[keyMap['GalaxyID']],
            regions: {}
          }
        }
        const galaxy = res[r[keyMap['GalaxyID']]]
        // Set region
        const regionID = r[keyMap['Glyph Code']].slice(4)
        if (galaxy.regions[regionID] === undefined) {
          galaxy.regions[regionID] = {
            regionName: r[keyMap['Region']],
            systems: []
          }
        }
        const region = galaxy.regions[regionID]
        // Set system
        const systemID = r[keyMap['System ID']]
        if (region.systems[systemID] === undefined) {
          region.systems[systemID] = {}
        }
        const system = region.systems[systemID]
        // Check date
        const prevSurvey = system.surveyDate !== undefined ? new Date(system.surveyDate).setHours(0, 0, 0, 0) : new Date(0)
        const currSurvey = r[keyMap['Survey Date']] !== '' ? new Date(r[keyMap['Survey Date']]).setHours(0, 0, 0, 0) : new Date(r[keyMap['Discovery Date']]).setHours(0, 0, 0, 0)
        // Fill new (undef or recent record)
        if (system.surveyDate === undefined || (prevSurvey < currSurvey)) {
          if (r[keyMap['System Name (All platforms)']] !== '') { system.name = r[keyMap['System Name (All platforms)']] }
          if (r[keyMap['Original Sys Name']] !== '') { system.originalName = r[keyMap['Original Sys Name']] }
          if (r[keyMap['Galactic Coordinates']] !== '') { system.coordinates = r[keyMap['Galactic Coordinates']] }
          if (r[keyMap['Glyph Code']] !== '') { system.glyphs = r[keyMap['Glyph Code']] }
          if (r[keyMap['Discovery Date']] !== '') {
            const prevDisco = system.dicoveryDate !== undefined ? new Date(system.discoveryDate).setHours(0, 0, 0, 0) : new Date(0)
            const currDisco = r[keyMap['Discovery Date']] !== '' ? new Date(r[keyMap['Discovery Date']]).setHours(0, 0, 0, 0) : new Date(0)
            if (system.discoveryDate === undefined || (currDisco < prevDisco)) { // Dicovered earlier
              system.discoveryDate = r[keyMap['Discovery Date']]
              system.discoveredBy = r[keyMap['Discovered by']]
            }
          }
          if (r[keyMap['Survey Date']] !== '') {
            system.surveyDate = r[keyMap['Survey Date']]
            system.surveyedBy = r[keyMap['Source']]
            system.release = r[keyMap['Release']]
          }
          if (r[keyMap['Civilized?']] !== '') { system.civilized = r[keyMap['Civilized?']] }
          if (r[keyMap['Bases']] !== '') { system.bases = r[keyMap['Bases']] }
          if (r[keyMap['Multiple stars?']] !== '') { system.starCount = r[keyMap['Multiple stars?']] }
          if (r[keyMap['Category']] !== '') { system.starClass = r[keyMap['Category']] }
          if (r[keyMap['Color']] !== '') { system.starColor = r[keyMap['Color']] }
          if (r[keyMap['# of planets']] !== '') { system.planetCount = r[keyMap['# of planets']] }
          if (r[keyMap['# of moons']] !== '') { system.moonCount = r[keyMap['# of moons']] }
          if (r[keyMap['Faction']] !== '') { system.faction = r[keyMap['Faction']] }
          if (r[keyMap['LY from center (auto estimate)']] !== '') { region.ly = r[keyMap['LY from center (auto estimate)']] }
          if (r[keyMap['Water (Y/N)']] !== '') { system.water = r[keyMap['Water (Y/N)']] }
          if (r[keyMap['Economy']] !== '') { system.economy = r[keyMap['Economy']] }
          if (r[keyMap['Wealth']] !== '') { system.wealth = r[keyMap['Wealth']] }
          if (r[keyMap['e-buy']] !== '') { system.buy = r[keyMap['e-buy']] }
          if (r[keyMap['E-Sell']] !== '') { system.sell = r[keyMap['E-Sell']] }
          if (r[keyMap['Conflict']] !== '') { system.conflict = r[keyMap['Conflict']] }
          if (r[keyMap['X coord DEC']] !== '') { region.cx = parseInt(r[keyMap['X coord DEC']]) }
          if (r[keyMap['Y coord DEC']] !== '') { region.cy = parseInt(r[keyMap['Y coord DEC']]) }
          if (r[keyMap['Z coord DEC']] !== '') { region.cz = parseInt(r[keyMap['Z coord DEC']]) }
          if (r[keyMap['System ID']] !== '') { system.ssi = parseInt(r[keyMap['System ID']]) }
          if (r[keyMap['Lock Record?']] !== '') { system.locked = r[keyMap['Lock Record?']] }
          if (r[keyMap['Phantom System?']] !== '') { system.phantom = r[keyMap['Phantom System?']] }
          if (r[keyMap['NMS wiki Link']] !== '') { system.wiki = r[keyMap['NMS wiki Link']] }
          if (r[keyMap['Star System Age (billions of years)']] !== '') { system.age = r[keyMap['Star System Age (billions of years)']] }
          if (r[keyMap['Researchteam']] !== '') { system.team = r[keyMap['Researchteam']] }
          // if (r[keyMap['Galaxy']] !== '') { system.galaxy = r[keyMap['Galaxy']] }
          // if (r[keyMap['Region']] !== '') { system.region = r[keyMap['Region']] }
          // if (r[keyMap['GalaxyID']] !== '') { system.galaxyID = r[keyMap['GalaxyID']] }
          if (r[keyMap['Economy Level']] !== '') { system.economyLevel = r[keyMap['Economy Level']] }
          if (r[keyMap['Wealth Level']] !== '') { system.wealthLevel = r[keyMap['Wealth Level']] }
          if (r[keyMap['Conflict Level']] !== '') { system.conflictLevel = r[keyMap['Conflict Level']] }
        } 
        else { // Fill blank from older record
          if (r[keyMap['System Name (All platforms)']] !== '' && system.name === undefined) { system.name = r[keyMap['System Name (All platforms)']] }
          if (r[keyMap['Original Sys Name']] !== '' && system.originalName === undefined) { system.originalName = r[keyMap['Original Sys Name']] }
          if (r[keyMap['Galactic Coordinates']] !== '' && system.coordinates === undefined) { system.coordinates = r[keyMap['Galactic Coordinates']] }
          if (r[keyMap['Glyph Code']] !== '' && system.glyphs === undefined) { system.glyphs = r[keyMap['Glyph Code']] }
          if (r[keyMap['Discovery Date']] !== '') {
            const prevDisco = system.discoveryDate !== undefined ? new Date(system.discoveryDate).setHours(0, 0, 0, 0) : new Date(0)
            const currDisco = r[keyMap['Discovery Date']] !== '' ? new Date(r[keyMap['Discovery Date']]).setHours(0, 0, 0, 0) : new Date(0)
            if (system.discoveryDate === undefined || (currDisco < prevDisco)) { // Dicovered earlier
              system.discoveryDate = r[keyMap['Discovery Date']]
              system.discoveredBy = r[keyMap['Discovered by']]
            }
          }
          if (r[keyMap['Civilized?']] !== '' && system.civilized === undefined) { system.civilized = r[keyMap['Civilized?']] }
          if (r[keyMap['Bases']] !== '' && system.bases === undefined) { system.bases = r[keyMap['Bases']] }
          if (r[keyMap['Multiple stars?']] !== '' && system.starCount === undefined) { system.starCount = r[keyMap['Multiple stars?']] }
          if (r[keyMap['Category']] !== '' && system.starClass === undefined) { system.starClass = r[keyMap['Category']] }
          if (r[keyMap['Color']] !== '' && system.starColor === undefined) { system.starColor = r[keyMap['Color']] }
          if (r[keyMap['# of planets']] !== '' && system.planetCount === undefined) { system.planetCount = r[keyMap['# of planets']] }
          if (r[keyMap['# of moons']] !== '' && system.moonCount === undefined) { system.moonCount = r[keyMap['# of moons']] }
          if (r[keyMap['Faction']] !== '' && system.faction === undefined) { system.faction = r[keyMap['Faction']] }
          if (r[keyMap['LY from center (auto estimate)']] !== '' && region.ly === undefined) { region.ly = r[keyMap['LY from center (auto estimate)']] }
          if (r[keyMap['Water (Y/N)']] !== '' && system.water === undefined) { system.water = r[keyMap['Water (Y/N)']] }
          if (r[keyMap['Economy']] !== '' && system.economy === undefined) { system.economy = r[keyMap['Economy']] }
          if (r[keyMap['Wealth']] !== '' && system.wealth === undefined) { system.wealth = r[keyMap['Wealth']] }
          if (r[keyMap['e-buy']] !== '' && system.buy === undefined) { system.buy = r[keyMap['e-buy']] }
          if (r[keyMap['E-Sell']] !== '' && system.sell === undefined ) { system.sell = r[keyMap['E-Sell']] }
          if (r[keyMap['Conflict']] !== '' && system.conflict === undefined) { system.conflict = r[keyMap['Conflict']] }
          if (r[keyMap['X coord DEC']] !== '' && region.cx === undefined) { region.cx = parseInt(r[keyMap['X coord DEC']]) }
          if (r[keyMap['Y coord DEC']] !== '' && region.cy === undefined) { region.cy = parseInt(r[keyMap['Y coord DEC']]) }
          if (r[keyMap['Z coord DEC']] !== '' && region.cz === undefined) { region.cz = parseInt(r[keyMap['Z coord DEC']]) }
          if (r[keyMap['System ID']] !== '' && system.ssi === undefined) { system.ssi = parseInt(r[keyMap['System ID']]) }
          if (r[keyMap['Lock Record?']] !== '' && system.locked === undefined) { system.locked = r[keyMap['Lock Record?']] }
          if (r[keyMap['Phantom System?']] !== '' && system.phantom === undefined) { system.phantom = r[keyMap['Phantom System?']] }
          if (r[keyMap['NMS wiki Link']] !== '' && system.wiki === undefined) { system.wiki = r[keyMap['NMS wiki Link']] }
          if (r[keyMap['Star System Age (billions of years)']] !== '' && system.age === undefined) { system.age = r[keyMap['Star System Age (billions of years)']] }
          if (r[keyMap['Researchteam']] !== '' && system.team === undefined) { system.team = r[keyMap['Researchteam']] }
          // if (r[keyMap['Galaxy']] !== '' && system.galaxy === undefined) { system.galaxy = r[keyMap['Galaxy']] }
          // if (r[keyMap['Region']] !== '' && system.galaxy === undefined) { system.region = r[keyMap['Region']] }
          // if (r[keyMap['GalaxyID']] !== '' && system.galaxy === undefined) { system.galaxyID = r[keyMap['GalaxyID']] }
          if (r[keyMap['Economy Level']] !== '' && system.economyLevel === undefined) { system.economyLevel = r[keyMap['Economy Level']] }
          if (r[keyMap['Wealth Level']] !== '' && system.wealthLevel === undefined) { system.wealthLevel = r[keyMap['Wealth Level']] }
          if (r[keyMap['Conflict Level']] !== '' && system.conflictLevel === undefined) { system.conflictLevel = r[keyMap['Conflict Level']] }
        }
      }
      return res
    },[]);
  })
}

// Data: Load region's star system distances
function loadDistances(url) {
  console.log('Load star systems distances...')
  return loadSheets(url)
  .then(data => {
    console.log('chain / loadDistances OK')
    return data.reduce((res,r) => {
      if (r['System Name A'] !== '') {
        res.push({
          sourceName: r['System Name A'],
          sourceRegion: r['Region A'],
          source: r['Glyphs A'],
          sourceTarget: r['System Name B'],
          targetRegion: r['Region B'],
          target: r['Glyphs B'],
          distance: parseInt(r['Inter System Distance (ly)'])
        })
      }
      return res
    },[]);
  })
}


export const loadData = () => dispatch => {
  // return Promise.all([loadCatalogue(region), getDistances(region)])
  dispatch(setStatus('Loading'))
  return Promise.all([loadCatalogue(CATALOGUE), loadDistances(INTRAREGION), loadDistances(INTERREGION)])
  .then(data => {
    console.log('loadData / catalogue', data[0])
    console.log('loadData / inter-region', data[1])
    console.log('loadData / intra-region', data[2])
    // Save full catalogue
    dispatch(setCatalogue(data[0]))
    dispatch(setDistances(data[1].concat(data[2])))
    dispatch(setStatus('Full'))
  })
  .catch(err => {
    console.log(err)
    dispatch(setStatus('NoData'))
  })
}

export const changeGalaxy = galaxyID => dispatch => {
  // Display galaxy scene
  dispatch(setStatus('Galaxy'))
  // Set Menu
  dispatch(setGalaxyID(galaxyID))
}

export const changeRegion = regionID => dispatch => {
  // Display galaxy scene
  dispatch(setStatus('Region'))
  // Set Menu
  dispatch(setRegionID(regionID))
}