import { createSlice } from '@reduxjs/toolkit'
import { data } from 'autoprefixer';
import { useSelector, useDispatch } from 'react-redux';


const updateRoutineSlice = createSlice({
    name: 'updateRoutine',
    initialState: {
        list: [],


    },
    reducers: {

        createUpdateRoutes: (state, { payload }) => {
            console.log(payload);
            state.list = {
                title: payload,
                exercises: []
            }
        },

        setUpdateRoutes: (state, { payload }) => {
            const { newList } = payload
            console.log(newList)
            newList.routine_items.map((item)=>

            state.list.exercises.push({
                exercise_id: item.exercise_id,
                note: item.note,
                order: 1,
                rest_timer: item.rest_timer,
                sets: item.routine_sets.map((set) => set.amount),

            }) )
                                                                  
           
        }

    }
})

export const { createUpdateRoutes, setUpdateRoutes } = updateRoutineSlice.actions

export default updateRoutineSlice.reducer
