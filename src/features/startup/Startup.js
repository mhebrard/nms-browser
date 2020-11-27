import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useRef, useEffect} from 'react';
import { loadData, getCatalogue } from './startupSlice';
import { Menu } from '../menu/Menu'

export function Startup() {
  const dispatch = useDispatch()
  const catalogue = useSelector(getCatalogue)
  

  return (
    <div>
      {catalogue.length > 0 ? <Menu /> : 
        <button
          type='button'
          onClick={e => dispatch(loadData())}
        >Initiate
        </button>
      }
    </div>
  )
}