import { createSlice } from '@reduxjs/toolkit';

const routinesdaySlice = createSlice({
    name: 'routinesday',
    initialState: {
        list: [],
        super_set: ''
    },
    reducers: {
        remove: (state, { payload }) => {
            state.list = []
        },

        setRoutes: (state, { payload }) => {
            state.list = payload
        },

        setDone: (state, { payload }) => {
            const { IdSet, IdEx, check } = payload

            state.list = state.list.map((items) => {
                return {
                    ...items,
                    routine_items: items.routine_items.map((item) =>
                        item.id == IdEx ?
                            {
                                ...item,
                                routine_sets: item.routine_sets.map((sets, index) => index == IdSet ? { ...sets, done: check, numberDone: 1 } : sets)
                            }
                            : item)
                }
            }
            )

        },

        updateAddExercise: (state, { payload }) => {
            const { chosen } = payload
            console.log(chosen);
            state.list.map((item) => item.routine_items.push({
                id: Math.floor(Math.random() * 1000),
                exercise_id: chosen.id,
                note: '',
                order: 1,
                rest_timer: '',
                exercise: { id: chosen.id, fa_title: chosen.fa_title, en_title: chosen.en_title, type: chosen.type },
                routine_sets: []
            })
            )


        },


        updateDeleteExercise: (state, { payload }) => {
            state.list = state.list.map((items) => {
                return {
                    ...items,
                    routine_items: items.routine_items.filter((item) =>
                        item.id !== payload)
                }
            }
            )
        },


        addSetUpdate: (state, { payload }) => {
            state.list.map((items) =>
                items.routine_items.map((item) =>
                    item.id == payload ?
                        item.routine_sets.push(
                            {
                                id: Math.floor(Math.random() * 1000),
                                amount: item.exercise.type.indices?.map((type) => [
                                    { index_id: type.id || type.index_id, amount: '' }])
                            }
                        )
                        : item))
        },


        setUpdateRestTimer: (state, { payload }) => {
            const { Id, restTimer } = payload

            state.list = state.list.map((items) => {
                return {
                    ...items,
                    routine_items: items?.routine_items.map((item) =>
                        item.id == Id ?
                            {
                                ...item,
                                rest_timer: restTimer
                            }
                            : item
                    )
                }
            })


        },

        setUpdateNote: (state, { payload }) => {
            const { Id, note } = payload
            state.list = state.list.map((items) => {
                return {
                    ...items,
                    routine_items: items.routine_items.map((item) =>
                        item.id == Id ?
                            {
                                ...item,
                                note: note
                            }
                            : item
                    )
                }
            })
        },

        setUpdateInputNumber: (state, { payload }) => {
            const { number, Id, IndexSet, SetId, Index_Id } = payload
            const newOject = state.list.map((it) => it.routine_items.map((ite) => ite.routine_sets.map((se) => se.amount.map((am) => am[0]))))
            state.list = state.list.map((items) => {
                return {
                    ...items,
                    routine_items: items.routine_items.map((item) =>
                        item.id == Id ?
                            {
                                ...item,
                                routine_sets: item.routine_sets.map((sets, index) => sets.id == SetId ? {
                                    ...sets,
                                    amount: sets.amount.map((amounts) => amounts[0].index_id == Index_Id ?
                                        [{ index_id: Index_Id, amount: number }] : [{ index_id: amounts[0].index_id, amount: amounts[0].amount }]
                                        // [(amounts[0] ? amounts[0] : amounts)]
                                    )
                                } : sets)
                            }
                            : item)
                }
            }
            )
        },

        deleteSet: (state, { payload }) => {
            const { indexSet, id } = payload
            state.list = state.list.map((items) => {
                return {
                    ...items,
                    routine_items: items.routine_items.map((item) =>
                        item.id == id ?
                            {
                                ...item,
                                routine_sets: item.routine_sets.filter((sets, index) => index !== indexSet)
                            } : item
                    )
                }
            })
        },


        setSuperSet: (state, { payload }) => {
            state.super_set = payload

        },

        deleteSuperSetHistory: (state, { payload }) => {
            const {id ,IndexSuper} = payload
            state.list = state.list.map((items) => {
                return {
                    ...items,
                    routine_items: items.routine_items.map((item) => 
                    item.exercise_id == id ?
                        {
                            ...item,
                             super_set : []    
                         }
                           : item    ) }
                       },
           state.super_set = state.super_set.filter((item , index) => index !== IndexSuper)
            )  },



            updatecreateSuperSet:(state,{payload}) =>{
               
                state.list = state.list.map((items) => {
                    return {
                        ...items,
                        routine_items: items.routine_items.map((item) => 
                        item.id ==  payload?
                            {
                                ...item,
                                 super_set : [item.exercise_id ]    
                             }
                               : item    ) }
                           }, )

                        //    state.list.map((item) => item.routine_items.map((items)=> items.id == payload? state.super_set.push([{key : payload , id :items.exercise_id  }]) : '') )

            },

            updateAddSuperSet: (state, { payload }) => {

                const {id, SuperSetKey } = payload
                console.log(id, SuperSetKey )
                state.list = state.list.map((items) => {
                    return {
                        ...items,
                        routine_items: items.routine_items.map((item) => 
                        item.id ==  SuperSetKey?
                            {
                                ...item,
                                 super_set : [item.exercise_id ,id ]    
                             }
                               : item    ) }
                               


                           }, );

                           state.list.map((item) => item.routine_items.map((items)=> items.id == SuperSetKey ? state.super_set.push([{key : SuperSetKey , id :id  } ,{key : SuperSetKey , id :items.exercise_id  }]) : '') )

                 
            },

        

    }
})

export const { remove, setRoutes, setDone, addSetUpdate,updateAddSuperSet, setSuperSet,updatecreateSuperSet, deleteSuperSetHistory, updateDeleteExercise, setUpdateNote, setUpdateRestTimer, deleteSet, updateAddExercise, setUpdateInputNumber } = routinesdaySlice.actions

export default routinesdaySlice.reducer








