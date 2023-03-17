import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteExercise } from '../../store/slice/exerciseSlice'

const ButtunDeleteExercise = ({ Id ,Item}) => {
    const dispatch = useDispatch()
    const deleteexercise = () => {
        dispatch(deleteExercise({ Id }))
    }
    return (
        <button onClick={deleteexercise}>delete</button>
    )
}

export default ButtunDeleteExercise
