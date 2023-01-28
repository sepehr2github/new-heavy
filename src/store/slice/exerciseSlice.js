import { createSlice } from '@reduxjs/toolkit'
import { data } from 'autoprefixer';
import { useSelector, useDispatch } from 'react-redux';


const exerciseSlice = createSlice({
    name: 'exercise',
    initialState: {
        list: [],
        title: '',

    },
    reducers: {
        Remove : (state, {payload}) =>{
            state.list = []
            state.title = ''
        },

        setExercise: (state, { payload }) => {
            const {chosen} = payload
            return {
                ...state,   
                list: [
                    ...state.list,
                    {
                        id: chosen.id,
                        key: Math.floor(Math.random() * 1000),
                        en_title: chosen.en_title,
                        fa_title: chosen.fa_title,
                        keywords: chosen.keywords,
                        type: chosen.type.indices,
                        restTimer: '',
                        sets: []
                        // {index_id:'' , amount:'' } 
                    }
                ]
            }
        },


        deleteExercise: (state, { payload }) => {
            console.log(payload);
            state.list = state.list.filter((item) => item.key !== payload)
        },


        addSet: (state, { payload }) => {
            state.list = state.list.map((item, index) => {
                return item.key == payload
                    ?
                    {
                        ...item,
                        sets: [...item.sets, item.type.map((option, index) =>  [{ index_id: option.index_id, amount:''}] )]
                    }
                    : item
            })
        },


        setInputNumber: (state, { payload }) => {
            const { number, Id, IndexSet, Ind } = payload
            state.list.map((item) => item.key == Id ? item.sets[IndexSet][Ind][0].amount = number : item)
        },

        addRestTimer: (state, { payload }) => {
            const { restTimer, Id } = payload
            state.list = state.list.map((item) => {
                return item.key === Id
                    ? {
                        ...item,
                        restTimer: restTimer
                    }
                    : item
            })
        },


        addNote: (state,{payload}) =>{
            const {note , Id} = payload 
            state.list = state.list.map((item)=> {
                return item.key == Id 
                ?{
                    ...item ,
                    note: note
                } 
                :item
            })
        },

        addTitle: (state ,{payload}) =>{
            const {mainTitle} = payload
            state.title = mainTitle

        },

        deleteSet : (state , {payload}) => {
            const {indexSet , id} = payload
            console.log(indexSet , id);
            state.list = state.list.map((item) => {
                return item.key === id 
                ? { 
                    ...item ,   
                  sets : item.sets.filter((set , index) => index !== indexSet ) 
                }
                : item 
            })
        }


    }

}
)


export const {Remove, setExercise, deleteExercise, addSet, setInputNumber, addNote ,addTitle ,addRestTimer ,deleteSet} = exerciseSlice.actions

export default exerciseSlice.reducer