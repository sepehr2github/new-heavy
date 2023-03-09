import { createSlice } from '@reduxjs/toolkit'

const listExerciseSlice = createSlice({
    name: 'listExercise',
    initialState: {
        list:{ exercises: [] ,equipments : [] , musclses : []}
    },
    reducers: {
        addExericse: (state, { payload }) => {
           state.list.exercises =payload

        },
        addEquipments: (state, { payload }) => {
            state.list.equipments = payload

        },
         addMuscles: (state, { payload }) => {
            state.list.musclses = payload

        },

    }
}
)

// 
export const { addExericse, addEquipments, addMuscles } = listExerciseSlice.actions

export default listExerciseSlice.reducer

//
// 


