import { createSlice } from '@reduxjs/toolkit'


const historyRoutinSlice = createSlice({
    name: 'historyRoutin',
    initialState: {
        list: []
    },
    reducers: {
        createHistory: (state, { payload }) => {
            const item = payload[0]
            state.list = {
                routine_id: item?.id,
                timer: 0,
                exercises : [item?.routine_items?.map((exercise) => {
                    return{
                        exercise_id : exercise.id,
                        order : 1 ,
                        rest_timer:exercise.rest_timer,
                        sets:[exercise?.routine_sets.map(((set) => {
                            return {
                                amount:set.amount
                            }
                        }))
                        ]

                    }
                }

                )]
            }
        },

        addTimer : (state , {payload}) => {
            const {timer} = payload

        console.log(timer);
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


