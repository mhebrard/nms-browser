import { configureStore } from '@reduxjs/toolkit'
import menuReducer from '../features/menu/menuSlice'
import tooltipReducer from '../features/tooltip/tooltipSlices'
import startupReducer from '../features/startup/startupSlice'

export default configureStore({
  reducer: {
    startup: startupReducer,
    menu: menuReducer,
    tooltip: tooltipReducer,
  },
});
