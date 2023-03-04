import { createSlice } from "@reduxjs/toolkit";
import { logDOM } from "@testing-library/react";


const titleRoutinSlice = createSlice({
    name: 'titleRoutin',
    initialState: {
        list: [],
    },
    reducers: {

        createList: (state, { payload }) => {
            state.list = payload

        },
        deleteRouteRedux: (state ,{payload}) => {

            state.list= state.list.filter((item) => item.id !== payload.Id )
        },

    }
})



export const { createList ,deleteRouteRedux} = titleRoutinSlice.actions

export default titleRoutinSlice.reducer
