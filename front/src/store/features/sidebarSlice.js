import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

export const sSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        openSidebar: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const {openSidebar} = sSlice.actions
export default sSlice.reducer