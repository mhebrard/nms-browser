import React from 'react';
import { useSelector } from 'react-redux';

import { isVisible, getNode, getPosition} from './tooltipSlices';
import styles from './Tooltip.module.css';

import img_default from '../../img/SYSTEM.png'
import img_cross from '../../img/SYSTEM.CROSS.png';
import img_gek from '../../img/SYSTEM.RACEGEK.png';
import img_korvax from '../../img/SYSTEM.RACEKORVAX.png';
import img_vykeen from '../../img/SYSTEM.RACEVYKEEN.png';
import img_materials from '../../img/SYSTEM.ECOFUSION.png';
import img_technology from '../../img/SYSTEM.ECOHIGHTECH.png';
import img_manufacturing from '../../img/SYSTEM.ECOMANUFACTURING.png';
import img_mining from '../../img/SYSTEM.ECOMINING.png'
import img_power from '../../img/SYSTEM.ECOPOWERGEN.png';
import img_scientific from '../../img/SYSTEM.ECOSCIENTIFIC.png';
import img_trading from '../../img/SYSTEM.ECOTRADING.png';
import img_conflict from '../../img/SYSTEM.CONFLICT.png';
import img_rank0 from '../../img/RANK.0.png';
import img_rank1 from '../../img/RANK.1.png';
import img_rank2 from '../../img/RANK.2.png';
import img_rank3 from '../../img/RANK.3.png';
import { getMode, getPlatform } from '../menu/menuSlice';

export function Tooltip() {
  const visible = useSelector(isVisible)
  const node = useSelector(getNode)
  const pos = useSelector(getPosition)
  const platform = useSelector(getPlatform)
  const mode = useSelector(getMode)

  let img_race = img_default
  let img_eco = img_default
  let img_war = img_rank0
  let img_wealth = img_rank0

  if (node) {
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
        img_war = img_rank1
        break;
      case '2':
        img_war = img_rank2
        break;
      case '3':
        img_war = img_rank3
        break;
      default:
        img_war = img_rank0
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

  const styleDyn = {
    opacity: visible ? 1 : 0,
    top: `${pos.y}px`,
    left: `${pos.x}px`
  };

  return (
    <div className={[styles.abs, styles.tronbox, styles.content].join(" ")}
      style={styleDyn}>
      <div className={[styles.flex, styles.bold].join(" ")}>
        { node ? node[platform][mode].name || node.name || '[unknown]' : null }
      </div>
      <div className={[styles.flex].join(" ")}>
        <div className={styles.col}>
          <img src={img_race} className={styles.img} alt="faction"/>
          <img src={img_rank0} alt="faction"/>
        </div>
        <div className={styles.col}>
          <img src={img_eco} className={styles.img} alt="economy"/>
          <img src={img_wealth} alt="economy"/>
        </div>
        <div className={styles.col}>
          <img src={img_conflict} className={styles.img} alt="conflict"/>
          <img src={img_war} alt="conflict"/>
        </div>
      </div>
      <div><small>Sell: {node ? node.sell : 0}% / Buy: {node ? node.buy : 0}%</small></div>
    </div>
  )
}