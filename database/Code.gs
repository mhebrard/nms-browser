// Copyright 2017 Google LLC.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Edited by Maxime HEBRARD <maxime.hebrard@gmail.com>

function setEnv() {

// Set a property in each of the three property stores.
var scriptProperties = PropertiesService.getScriptProperties();
// var userProperties = PropertiesService.getUserProperties();
// var documentProperties = PropertiesService.getDocumentProperties();

scriptProperties.setProperty('EMAIL', '....com');
scriptProperties.setProperty('KEY', '-----BEGIN PRIVATE KEY-----\n...');
scriptProperties.setProperty('PROJECT', '...');
  
}

function Firestore() {  
  const props = PropertiesService.getScriptProperties()// getUserProperties() Or .getScriptProperties()
  const [EMAIL, KEY, PROJECT] = [props.getProperty('EMAIL'), props.getProperty('KEY'), props.getProperty('PROJECT')];
  const firestore = FirestoreApp.getFirestore(EMAIL, KEY, PROJECT);
    
  return firestore;
}

function myOnEdit(e) {
  // Test current sheet
  switch (e.range.getSheet().getName()) {
    case "Region DB":
      updateRegion(e);
      break;
    case "System DB":
      updateSystem(e);
      break;
    default:
      break;
  }
}

function updateRegion(e) {
  // PARAMS //
  const lastCol = 42;
  // //

  // Toast logs
  const ss = e.range.getSheet().getParent();

  // Get sheet
  const sheet = e.range.getSheet();

  // Get Headers
  const head = getHeaders(sheet, lastCol);

  // Check edited rows
  const firstRow = e.range.getRow();
  const numRows = e.range.getNumRows();

  // For each row
  for(let i=0; i<numRows; i++) {
    const row = firstRow + i;

    // Initial checks
    const galaxy = {
        id: sheet.getRange(row, head["Galaxy ID"]).getValue(),
      };
    const region = {
      name: sheet.getRange(row, head["Region Name"]).getValue(),
      glyphs: sheet.getRange(row, head["Glylphs"]).getValue(),
      status: sheet.getRange(row, head["FBStatus"]).getValue(),
    }
    // Define region id
    if (region.glyphs.length > 0) {
      // Ignore first 4 digits (Planet - System)
      region.id = region.glyphs.slice(4);
    } else {
      // Safe spaces
      region.id = region.name.replace(/\s/g, '_');
    }
  
    // Check row status
    // NC - Not committed to Sync
    // C - Commit to Sync
    // D - Delete from Firebase
    // S - Sync completed
    // DC - Delete completed

    if (region.status == 'D') {
      // Delete from Firebase
      // Need to delete sub-collections before deleting the collection

      // Sync
      db = Firestore();
      // Region
      db.deleteDocument('Galaxies/' + galaxy.id + '/Regions/' + region.id);
      // Update status
      sheet.getRange(row, head["FBStatus"]).setValue('DC')    
    } // end status = D

    if (region.status == 'C') {
      // Commit to Sync

      // Get data
      galaxy.name = sheet.getRange(row, head["Galaxy"]).getValue();
      // Preferred glyphs | Alternate name
      // region.id = sheet.getRange(row, head["Glylphs"]).getValue();
      // region.name = sheet.getRange(row, head["Region Name"]).getValue();
      // Independent of System civ
      region.civ = sheet.getRange(row, head["Civilized"]).getValue();
      // Ensure last digits are :0000
      region.coords = sheet.getRange(row, head["Coordinates"]).getValue();
      // Secondary field from coords
      region.quadrant = sheet.getRange(row, head["Quadrant"]).getValue();
      // Secondary field from coords
      // region._ = sheet.getRange(row, head["XX"]).getValue();
      // region._ = sheet.getRange(row, head["YY (altitude)"]).getValue();
      // region._ = sheet.getRange(row, head["ZZ"]).getValue();
      // Unique index
      region.docSeq = sheet.getRange(row, head["Doc Sequence"]).getValue();
      // Controlled field
      region.release = sheet.getRange(row, head["Game Release"]).getValue();
      // Deduced from systems
      region.discoveredBy = sheet.getRange(row, head["Earliest Known Surveyor ID"]).getValue();
      // Deduced from systems
      region.surveyedBy = sheet.getRange(row, head["Latest Surveyor ID"]).getValue();
      // Deduced from systems
      region.surveyedDate = sheet.getRange(row, head["Auto Latest Survey"]).getValue(); 
      region.summaryNotes = sheet.getRange(row, head["Summary Notes"]).getValue();
      region.locationNotes = sheet.getRange(row, head["Location Notes"]).getValue();
      region.additionalNotes = sheet.getRange(row, head["Additional Notes"]).getValue();
      region.civNotes = sheet.getRange(row, head["Civilized Space Notes"]).getValue();
      // if Y lock the row from edit by non-admin
      region.lock = sheet.getRange(row, head["Lock Record"]).getValue();
      region.age = sheet.getRange(row, head["Region Age (billions of years)"]).getValue();
      // Deduced from system
      // region.firstPhantom = sheet.getRange(row, head["Lowest Known Phantom System (3 digit hex)"]).getValue();
      region.wikiLink = sheet.getRange(row, head["NMS Wiki link"]).getValue();
      region.externalLink = sheet.getRange(row, head["External Link 1"]).getValue();
      region.videoLink = sheet.getRange(row, head["Video Link 1"]).getValue();
      // Secondary field from coords
      region.lightYears = Math.round(sheet.getRange(row, head["Light Years Estimate"]).getValue());
      // Deduce from system
      // region.atlas = sheet.getRange(row, head["Atlas Inteface (lookup key)"]).getValue();
      // region.blackHole = sheet.getRange(row, head["Black Hole (Lookup key)"]).getValue();
      // region.discoveryDate = sheet.getRange(row, head["Earliest System Discovery"]).getValue();
      // Secondary field from coords
      // region._ = sheet.getRange(row, head["Base Coord"]).getValue();
      // Secondary field from discoverBy // Controlled fields 
      region.discoveredWiki = sheet.getRange(row, head["Earliest Surveryor WikiUser"]).getValue();
      // Secondary field from discoverBy // Controlled fields
      region.surveyorWiki = sheet.getRange(row, head["Latest Surveryor WikiUser"]).getValue();
      // Admin restricted
      region.adminNotes = sheet.getRange(row, head["Admin Notes"]).getValue();	
      region.legacyName = sheet.getRange(row, head["Pre-Atlas Rises Legacy Name"]).getValue();
      region.legacyWiki = sheet.getRange(row, head["Pre-Atlas Rises Legacy wiki link"]).getValue();
      // Deduced from coord
      region.x = sheet.getRange(row, head["XX (dec)"]).getValue();
      region.y = sheet.getRange(row, head["YY (dec)"]).getValue();
      region.z = sheet.getRange(row, head["ZZ (dec)"]).getValue();
      // region.glyphs = sheet.getRange(row, head["Glylphs"]).getValue();
      // region.status = sheet.getRange(row, head["FBStatus"]).getValue();

      // Sync
      db = Firestore();
      // Galaxy
      db.updateDocument('Galaxies/' + galaxy.id, galaxy, true);
      // Region
      db.updateDocument('Galaxies/' + galaxy.id + '/Regions/' + region.id, region, true);
      // Update status
      sheet.getRange(row, head["FBStatus"]).setValue('S')
    } // end status == C

  } // end for each row
} // end updateRegion

function updateSystem(e) {
  // PARAMS //
  const lastCol = 109;
  // //

  // Toast logs
  const ss = e.range.getSheet().getParent();

  // Get sheet
  const sheet = e.range.getSheet();

  // Get Headers
  const head = getHeaders(sheet, lastCol);

  // Check edited rows
  const firstRow = e.range.getRow();
  const numRows = e.range.getNumRows();

  // For each row
  for(let i=0; i<numRows; i++) {
    const row = firstRow + i;

    // Get data
    const galaxy = {
      // id: sheet.getRange(row, head["Galaxy ID"]).getValue(),
      name: sheet.getRange(row, head["Galaxy"]).getValue(),
    };
    const region = {
      // id: sheet.getRange(row, head["Glylphs"]).getValue(),
      name: sheet.getRange(row, head["Region"]).getValue(),
    };

    // Handle station trade items as an array of string
    // Could be a collection of items, or an array of reference, or an array of string
    const trades = [40,41,42,43,44].reduce((res, i) => {
      const item = sheet.getRange(row, i).getValue();
      if (item.length > 0) {
        res.push(item);
      }
      return res;
    },[]);
    
    const system = {
      // id: sheet.getRange(row, head["Glylphs"]).getValue(),
      // name: sheet.getRange(row, head["System Name (Unique entry search key)"]).getValue(),
      name: sheet.getRange(row, head["System Name (All platforms)"]).getValue(),
      qualityNotes: sheet.getRange(row, head["Editor and admin notes on data quality"]).getValue(),
      qualityChecks: sheet.getRange(row, head["Data Quality Check"]).getValue(),
      originalName: sheet.getRange(row, head["Original Sys Name"]).getValue(),
      coords: sheet.getRange(row, head["Galactic Coordinates"]).getValue(),
      glyphs: sheet.getRange(row, head["Glyph Code"]).getValue(),
      planetOfInterest: sheet.getRange(row, head["Planets of interest"]).getValue(),
      surveyedBy: sheet.getRange(row, head["Source/Surveyor Name"]).getValue(),
      discoveredBy: sheet.getRange(row, head["Discovered by"]).getValue(),
      surveyDate: sheet.getRange(row, head["Survey Date"]).getValue(),
      discoveryDate: sheet.getRange(row, head["Discovery Date"]).getValue(),
      civ: sheet.getRange(row, head["Civilized?"]).getValue(),
      discoveryPlatform: sheet.getRange(row, head["Discovery Platform"]).getValue(),
      starCount: sheet.getRange(row, head["Multiple stars?"]).getValue(),
      starCategory: sheet.getRange(row, head["Category"]).getValue(),
      starColor: sheet.getRange(row, head["Color"]).getValue(),
      planetCount: sheet.getRange(row, head["# of planets"]).getValue(),
      moonCount: sheet.getRange(row, head["# of moons"]).getValue(),
      faction: sheet.getRange(row, head["Faction"]).getValue(),
      lightYears: Math.round(sheet.getRange(row, head["LY from center (auto estimate)"]).getValue()),
      water: sheet.getRange(row, head["Water (Y/N)"]).getValue(),
      economy: sheet.getRange(row, head["Economy"]).getValue(),
      wealth: sheet.getRange(row, head["Wealth"]).getValue(),
      buy: sheet.getRange(row, head["e-buy"]).getValue(),
      sell: sheet.getRange(row, head["E-Sell"]).getValue(),
      conflict: sheet.getRange(row, head["Conflict"]).getValue(),
      release: sheet.getRange(row, head["Release"]).getValue(),
      // Should be a reference to MT object
      stationMultiTool: sheet.getRange(row, head["Space Station Multi-Tool"]).getValue(), 
      // Could be a collection of items, or an array of reference, or an array of string
      stationTradeItems: trades,      				
    };

    // // Check if row is valid
    // var valid = false;
    // if (region.lock == 'Y') { valid=true; }

    // // Define region id
    // if (region.glyphs.length > 0) {
    //   region.id = region.glyphs.slice(4);
    // } else {
    //   region.id = region.name.replace(/\s/g, '');
    // }

    // // Update Galaxy
    // if (valid == true) {
    //   db = Firestore();
    //   // Galaxy
    //   db.updateDocument('Galaxies/' + galaxy.id, galaxy, true);
    //   // Region
    //   db.updateDocument('Galaxies/' + galaxy.id + '/Regions/' + region.id, region, true);
    //   // ss.toast('valid');
    // } else {
    //   // ss.toast('invalid');
    // }
  } // end for each row

  ss.toast('edit system ' + firstRow);

} // end updateSystem

function getHeaders(sheet, lastCol) {
  const headers = sheet.getRange(2,1,2,lastCol).getValues();
  let head = {};
  for(let i=0; i<lastCol; i++) {
    head[headers[0][i]] = i + 1;
  }
  return head;
}

function manual() {
  // // TEST UPDATE DOCS
  // // Get data
  // const sheet = "Region DB";
  // const galaxyName = "My Galaxy";
  // const lock = "Y";
  // const galaxyID = "999";

  // const regionName = "My Favorite Region";
  // const quadrant = "Gamma";
  // const wiki = "...";
  // const ly = "600000";
  // const coords = "1234:5678:9012";
  // const x = "10";
  // const y = "20";
  // const z = "30";
  // const glyphs = "0000ABCDEFGH";

  // Check if row is valid
  // var valid = false;
  // if (lock == 'Y' && glyphs.length > 0) { valid=true; }

  // Update Galaxy
  // if (valid == true) {
  //   db = Firestore();
  //   // Galaxy
  //   db.updateDocument('Galaxies/'+galaxyID, {
  //     "ID": galaxyID, 
  //     "name": galaxyName
  //   }, true);
  //   console.log('updateDocument: Galaxies/'+galaxyID+'{"ID": '+galaxyID+',"name": '+galaxyName+'}');
  //   db.updateDocument('Galaxies/'+galaxyID+'/Regions/'+glyphs, {
  //     "ID": glyphs, 
  //     "name": regionName,
  //     "coordinates": coords,
  //     "quadrant": quadrant,
  //     "wikiLink": wiki,
  //     "lightYears": ly,
  //     "x": x,
  //     "y": y,
  //     "z": z,
  //     "glyphs": glyphs
  //   }, true);
  //   console.log('updateDocument: Galaxies/'+galaxyID+'/Regions/'+glyphs);
  //   // Create a proper collection and document

  //   // db.updateDocument('Galaxies/'+galaxyID+'/Regions/'+glyphs, {
  //   //   "ID": glyphs, 
  //   //   "name": regionName,
  //   //   "coordinates": coords,
  //   //   "quadrant": quadrant,
  //   //   "wikiLink": wiki,
  //   //   "lightYears": ly,
  //   //   "x": x,
  //   //   "y": y,
  //   //   "z": z,
  //   //   "glyphs": glyphs
  //   // }, true);
  //   // console.log('Galaxies/'+galaxyID+'{"ID": '+galaxyID+',"name": '+galaxyName+'}');
  // } else {
  //   console.log('invalid');
  // }

  // // TEST QUERIES
  // db = Firestore();
  // const qs = db.query("Galaxies/1/Regions").Where("quadrant", "==", "Beta").Execute();
  // console.log(qs.length);
  // // console.log(qs[0].name)
  // console.log(qs[0].fields.name)
  // console.log(qs[0].fields.quadrant)
}