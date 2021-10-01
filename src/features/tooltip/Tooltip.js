import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isCollapse, getPosition, getNode, toggle} from './tooltipSlices';
import styles from './Tooltip.module.css';

// import img_logo from '../../img/logo/png';
import img_galaxy from '../../img/GALAXYMAP.png';
import img_glyph_0 from '../../img/PORTALSYMBOL.0.png';
import img_glyph_5 from '../../img/PORTALSYMBOL.5.png';
import img_glyph_A from '../../img/PORTALSYMBOL.A.png';

import img_yellow from '../../img/star_yellow.png';
import img_red from '../../img/star_red.png';
import img_green from '../../img/star_green.png';
import img_blue from '../../img/star_blue.png';

import img_default from '../../img/SYSTEM.png'
import img_cross from '../../img/SYSTEM.CROSS.png';
import img_gek from '../../img/RACE.GEK.png';
import img_korvax from '../../img/RACE.KORVAX.png';
import img_vykeen from '../../img/RACE.VYKEEN.png';
import img_materials from '../../img/ECONOMY.FUSION.png';
import img_technology from '../../img/ECONOMY.HIGHTECH.png';
import img_manufacturing from '../../img/ECONOMY.MANUFACTURING.png';
import img_mining from '../../img/ECONOMY.MINING.png'
import img_power from '../../img/ECONOMY.POWERGENERATION.png';
import img_scientific from '../../img/ECONOMY.SCIENTIFIC.png';
import img_trading from '../../img/ECONOMY.TRADING.png';
import img_conflict from '../../img/SYSTEM.CONFLICT.png';
import img_conflict_1 from '../../img/CONFLICT.LOW.png';
import img_conflict_2 from '../../img/CONFLICT.MEDIUM.png';
import img_conflict_3 from '../../img/CONFLICT.HIGH.png';
import img_rank0 from '../../img/RANK.0.png';
import img_rank1 from '../../img/RANK.1.png';
import img_rank2 from '../../img/RANK.2.png';
import img_rank3 from '../../img/RANK.3.png';

export function Tooltip() {
  const dispatch = useDispatch()
  const node = useSelector(getNode)
  const collapsed = useSelector(isCollapse)

  let img_color = img_yellow
  let img_race = img_default
  let img_eco = img_default
  let img_war = img_rank0
  let img_wealth = img_rank0

  if (node) {
    // Define star
    switch (node.starColor) {
      case 'Yellow':
        img_color = img_yellow
        break;
      case 'Red':
        img_color = img_red
        break;
      case 'Green':
        img_color = img_green
        break;
      case 'Blue':
        img_color = img_blue
        break;
      default:
        img_color = img_yellow
        break;
    }

    // Define race
    switch (node.faction) {
      case 'Korvax':
        img_race = img_korvax
        break;
      case 'Gek':
        img_race = img_gek
        break;
      case 'Vy\'keen':
        img_race = img_vykeen
        break;
      case 'Vy\'Keen':
        img_race = img_vykeen
        break;
      case 'Uncharted':
        img_race = img_cross
        break;
      default:
        img_race = img_default
        break;
    }
    // Define economy
    switch (node.economyLevel) {
      case 'Trading':
        img_eco = img_trading
        break;
      case 'Advanced Materials':
        img_eco = img_materials
        break;
      case 'Scientific':
        img_eco = img_scientific
        break;
      case 'Mining':
        img_eco = img_mining
        break;
      case 'Manufacturing':
        img_eco = img_manufacturing
        break;
      case 'Technology':
        img_eco = img_technology
        break;
      case 'Power Generation':
        img_eco = img_power
        break;
      case 'Unavailable':
        img_eco = img_cross
        break;
      default:
        img_eco = img_default
        break;
    }
    // Define conflict tier
    switch (node.conflictLevel) {
      case '1':
        img_war = img_conflict_1
        break;
      case '2':
        img_war = img_conflict_2
        break;
      case '3':
        img_war = img_conflict_3
        break;
      default:
        img_war = img_conflict
        break;
    }
    // Define wealth tier
    switch (node.wealthLevel) {
      case '1':
        img_wealth = img_rank1
        break;
      case '2':
        img_wealth = img_rank2
        break;
      case '3':
        img_wealth = img_rank3
        break;
      default:
        img_wealth = img_rank0
        break;
    }
  }

  return (
    <div
      className={[styles.sidenav, styles.tronbox, styles.content].join(" ")}
      style={{
        maxWidth: collapsed ? '30px' : '99vw',
        transition: 'max-width .5s'
      }}
      onClick={e => dispatch(toggle())}
      >
      <div><img src={img_galaxy} alt="galaxy"/>Galaxy: {node.galaxyName}</div>
      <div><img/>Region: {node.regionName}</div>
      <div><img/>Original: {node.originalName || '[unknown]'} </div>
      <div><img/>System: {node.name || '[unknown]'}</div>
      <div><img src={img_glyph_A} alt="coords" />Coords: {node.coordinates}</div>
      <div><img src={img_glyph_0} alt="glyphs" />Glyphs: {node.glyphs}</div>
      <div><img src={img_glyph_5} alt="light year" />LY: {node.regionLY} - Water: {node.water}</div>
      <div><img src={img_color} alt="star color" />Stars: {node.starCount} - {node.starClass} ({node.starColor})</div>
      <div><img/>{node.planetCount} Planet - {node.moonCount} Moon</div>
      <div><img src={img_race}  alt="race" />Faction: {node.faction}</div>
      <div><img src={img_eco}  alt="economy" />Economy: {node.economy}</div>
      <div><img/>Wealth: {node.wealth} ({node.wealthLevel})</div>
      <div><img/>Buy: {node.buy}% - Sell: {node.sell}%</div>
      <div><img src={img_war} alt="conflict" />Confict: {node.conflict} ({node.conflictLevel})</div>
      <div><img/>Discovered by {node.discoveredBy || '?'}</div>
      <div><img/>Discovered on {node.discoveryDate || '?'}</div>
      <div><img/>Surveyed by {node.surveyedBy}</div>
      <div><img/>Surveyed on {node.surveyDate}</div>
      <div><img/>Release: {node.release}</div>
      <div><img/>Civ: {node.civilized}</div>
    </div>
  )
}
