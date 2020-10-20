import { setRegion } from '../features/menu/menuSlice'
import { loadGraphData, setGraph } from '../features/scene/sceneSlice'

export const changeRegion = region => dispatch => {
  dispatch(setRegion(region))
  // dispatch(setGraph(region))
  dispatch(loadGraphData(region))
}