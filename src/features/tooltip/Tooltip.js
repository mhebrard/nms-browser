import React from 'react';
import { useSelector } from 'react-redux';

import { isVisible, getNode, getPosition} from './tooltipSlices';
import styles from './Tooltip.module.css';

export function Tooltip() {
  const visible = useSelector(isVisible)
  const node = useSelector(getNode)
  const pos = useSelector(getPosition)

  const style = {
    opacity: visible ? 1 : 0,
    top: `${pos.y}px`,
    left: `${pos.x}px`
  };

  return (
    <div className={[styles.abs, styles.tronbox].join(" ")}
      style={style}>
      <h1>
        Tooltip
      </h1>
    </div>
  )
}