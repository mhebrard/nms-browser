import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadData } from '../../chains'
import { getCatalogue, getStatus } from './startupSlice'
import { Menu } from '../menu/Menu'
import { Scene } from '../scene/Scene'
import logo from '../../logo.svg';

export function Startup() {
  const dispatch = useDispatch()
  const catalogue = useSelector(getCatalogue)
  const status = useSelector(getStatus)

  function Status() {
    return (
      <h1>
        {status}
      </h1>
    )
  }

  function Logo() {
    return (<img src={logo} className="App-logo" alt="logo" />)
  }

  function Loading() {
    return (
      <button
          type='button'
          onClick={e => dispatch(loadData())}
        >Initiate
      </button>
    )
  } 

  function render() {
    switch (status) {
      case 'Empty':
        return (
          <div>
            <Status />
            <Logo />
            <Loading />
          </div>
        )
      case 'Loading':
        return (
          <div>
            <Status />
            <Logo />
          </div>
        )
      case 'Full':
        return (
          <div>
            <Status />
            <Logo />
            <Menu />
          </div>
        )
      case 'Galaxy':
        return (
          <div>
            <Status />
            <Logo />
            <Menu />
          </div>
        )
      case 'Region':
        return (
          <div>
            <Status />
            <Logo />
            <Menu />
            <Scene />
          </div>
        )
      default:
        return Loading()
    }
  }

  return render()
}