import React from 'react';
import { useSelector } from 'react-redux';

import { isVisible, getNode, getPosition} from './tooltipSlices';
import styles from './Tooltip.module.css';

import img_default from '../../img/SYSTEM.png'
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

export function Tooltip() {
  const visible = useSelector(isVisible)
  const node = useSelector(getNode)
  const pos = useSelector(getPosition)

  let img_race = img_default
  let img_eco = img_default
  let img_war = img_rank0
  let img_wealth = img_rank0

  if (node) {
    // Define race
    switch (node['Race']) {
      case 'Korvax':
        img_race = img_korvax
        break;
      case 'Gek':
        img_race = img_gek
        break;
      case 'Vy\'keen':
        img_race = img_vykeen
        break;
      default:
        img_race = img_default
        break;
    }
    // Define economy
    switch (node['Economy Tier']) {
      case 'Trading':
        img_eco = img_trading
        break;
      case 'Materials':
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
      case 'Power':
        img_eco = img_power
        break;
      default:
        img_eco = img_default
        break;
    }
    // Define conflict tier
    switch (node['Conflict Tier']) {
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
    switch (node['Wealth Tier']) {
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
        {node ? (node['PC Name'] ? node['PC Name'] : node['Original Name']) : 'Unknown'}
      </div>
      <div className={[styles.flex].join(" ")}>
        <div className={styles.col}>
          <img src={img_race} className={styles.img}/>
          <img src={img_rank0}/>
        </div>
        <div className={styles.col}>
          <img src={img_eco} className={styles.img}/>
          <img src={img_wealth}/>
        </div>
        <div className={styles.col}>
          <img src={img_conflict} className={styles.img}/>
          <img src={img_war}/>
        </div>
      </div>
      <div><small>Sell: {node ? node['Sell'] : 0}% / Buy: {node ? node['Buy'] : 0}%</small></div>
    </div>
  )
}