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
    default:
      updateRegion(e);
  }
}

function updateRegion(e) {
  // PARAMS //
  const lastCol = 40;
  // //

  // Toast logs
  const ss = e.range.getSheet().getParent();

  // Get sheet
  const sheet = e.range.getSheet();

  // Get Headers
  const headers = sheet.getRange(2,1,2,lastCol).getValues();
  let head = {};
  for(let i=0; i<lastCol; i++) {
    head[headers[0][i]] = i + 1;
  }

  // Check edited rows
  const firstRow = e.range.getRow();
  const numRows = e.range.getNumRows();

  // For each row
  for(let i=0; i<numRows; i++) {
    const row = firstRow + i;

    // Get data
    const galaxy = {
      id: sheet.getRange(row, head["Galaxy ID"]).getValue(),
      name: sheet.getRange(row, head["Galaxy"]).getValue(),
    };
    const region = {
      // id: sheet.getRange(row, head["Glylphs"]).getValue(),
      name: sheet.getRange(row, head["Region Name"]).getValue(),
      civ: sheet.getRange(row, head["Civilized"]).getValue(),
      coords: sheet.getRange(row, head["Coordinates"]).getValue(),
      quadrant: sheet.getRange(row, head["Quadrant"]).getValue(),
      docSeq: sheet.getRange(row, head["Doc Sequence"]).getValue(),
      release: sheet.getRange(row, head["Game Release"]).getValue(),
      // discoveredBy: sheet.getRange(row, head["Earliest Known Surveyor ID"]).getValue(), // Deduced from systems
      // surveyedBy: sheet.getRange(row, head["Latest Surveyor ID"]).getValue(), // Deduced from systems
      summaryNotes: sheet.getRange(row, head["Summary Notes"]).getValue(),
      locationNotes: sheet.getRange(row, head["Location Notes"]).getValue(),
      additionalNotes: sheet.getRange(row, head["Additional Notes"]).getValue(),
      civNotes: sheet.getRange(row, head["Civilized Space Notes"]).getValue(),
      lock: sheet.getRange(row, head["Lock Record"]).getValue(),
      age: sheet.getRange(row, head["Region Age (billions of years)"]).getValue(),
      // firstPhantom: sheet.getRange(row, head["Lowest Known Phantom System (3 digit hex)"]).getValue(), // Deduced from system
      wikiLink: sheet.getRange(row, head["NMS Wiki link"]).getValue(),
      externalLink: sheet.getRange(row, head["External Link 1"]).getValue(),
      videoLink: sheet.getRange(row, head["Video Link 1"]).getValue(),
      lightYears: Math.round(sheet.getRange(row, head["Light Years Estimate"]).getValue()),
      legacyName: sheet.getRange(row, head["Pre-Atlas Rises Legacy Name"]).getValue(),
      legacyWiki: sheet.getRange(row, head["Pre-Atlas Rises Legacy wiki link"]).getValue(),
      x: sheet.getRange(row, head["XX (dec)"]).getValue(),
      y: sheet.getRange(row, head["YY (dec)"]).getValue(),
      z: sheet.getRange(row, head["ZZ (dec)"]).getValue(),
      glyphs: sheet.getRange(row, head["Glylphs"]).getValue(),
    };

    // Check if row is valid
    var valid = false;
    if (region.lock == 'Y') { valid=true; }

    // Define region id
    if (region.glyphs.length > 0) {
      region.id = region.glyphs.slice(4);
    } else {
      region.id = region.name.replace(/\s/g, '');
    }

    // Update Galaxy
    if (valid == true) {
      db = Firestore();
      // Galaxy
      db.updateDocument('Galaxies/' + galaxy.id, galaxy, true);
      // Region
      db.updateDocument('Galaxies/' + galaxy.id + '/Regions/' + region.id, region, true);
      // ss.toast('valid');
    } else {
      // ss.toast('invalid');
    }
  } // end for each row
} // end updateRegion

function manual() {
  // // TEST QUERIES
  // db = Firestore();
  // const qs = db.query("Galaxies/1/Regions").Where("quadrant", "==", "Beta").Execute();
  // console.log(qs.length);
  // console.log(qs[0].name)
  // console.log(qs[0].fields.name)
  // console.log(qs[0].fields.quadrant)
}