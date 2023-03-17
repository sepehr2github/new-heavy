import { createSlice } from '@reduxjs/toolkit'

const exerciseShowSlice = createSlice({
    name: 'exerciseShow',
    initialState: {
        list: []
    },
    reducers: {
        exerciseShow: (state, { payload }) => {
            state.list=payload.chosen
        },

    }
}
)

// 
export const { exerciseShow } = exerciseShowSlice.actions

export default exerciseShowSlice.reducer

// 
// 


