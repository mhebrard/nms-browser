import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import menuReducer from '../features/menu/menuSlice'
import sceneReducer from '../features/scene/sceneSlice'
import tooltipReducer from '../features/tooltip/tooltipSlices'
import startupReducer from '../features/startup/startupSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    startup: startupReducer,
    menu:menuReducer,
    scene:sceneReducer,
    tooltip: tooltipReducer,
  },
});
