import {configureStore} from '@reduxjs/toolkit'
import sideSlice from './features/sidebarSlice'

export const store = configureStore({
    reducer: {
        side: sideSlice,
    }
}) 