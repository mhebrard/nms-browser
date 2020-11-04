import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import menuReducer from '../features/menu/menuSlice'
import sceneReducer from '../features/scene/sceneSlice'
import tooltipReducer from '../features/tooltip/tooltipSlices'

export default configureStore({
  reducer: {
    counter: counterReducer,
    menu:menuReducer,
    scene:sceneReducer,
    tooltip: tooltipReducer,
  },
});
