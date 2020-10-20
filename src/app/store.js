import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import menuReducer from '../features/menu/menuSlice'
import sceneReducer from '../features/scene/sceneSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    menu:menuReducer,
    scene:sceneReducer
  },
});
