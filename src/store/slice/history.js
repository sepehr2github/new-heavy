import { createSlice } from '@reduxjs/toolkit'


const historyRoutinSlice = createSlice({
    name: 'historyRoutin',
    initialState: {
        list: []
    },
    reducers: {
        createHistory: (state, { payload }) => {
            const item = payload[0]
                console.log(item)
            state.list = {
                routine_id: item?.id,
                timer: 0,
                exercises : item?.routine_items?.map((exercise) => {
                    return{
                        exercise_id : exercise.exercise_id,
                        order : 1 ,
                        rest_timer:exercise.rest_timer,
                        super_set: exercise.super_set    ,
                        sets:exercise?.routine_sets.map((set) => set.amount.map((sets) => sets[0]))
                    }
                }

                )
            }
        },

        addTimer : (state , {payload}) => {
            const {timer} = payload
            state.list.timer = timer
        }

    }
}
)

// 
export const { createHistory , addTimer } = historyRoutinSlice.actions

export default historyRoutinSlice.reducer

//
// 


