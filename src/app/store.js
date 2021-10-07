import { configureStore } from '@reduxjs/toolkit'
import menuReducer from '../features/menu/menuSlice'
import tooltipReducer from '../features/tooltip/tooltipSlices'
import galaxyinfoReducer from '../features/galaxyinfo/GalaxyInfoSlice'
import startupReducer from '../features/startup/startupSlice'
import regionReducer from '../features/region/regionSlice'

export default configureStore({
  reducer: {
    startup: startupReducer,
    menu: menuReducer,
    galaxyinfo: galaxyinfoReducer,
    tooltip: tooltipReducer,
    region: regionReducer
  },
});
