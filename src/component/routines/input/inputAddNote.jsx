import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addNote } from '../../../store/slice/exerciseSlice'
import {setUpdateNote} from '../../../store/slice/routinesdaySlice'
import {TextareaAutosize, Typography} from '@mui/material'
const InputAddNote = ({  Id ,separator ,amount }) => {

    const [note, setNote] = useState(amount)
    const dispatch = useDispatch()

    const handleInputNote = (e) => {
        setNote(e.target.value)
    }

    useEffect(() => {
        if(separator == 1){dispatch(addNote({ note, Id }))}
        if(separator == 2 ){dispatch(setUpdateNote({Id , note}))}
    }, [note])


    return (
        <Typography variant="body2" color="black     " style={{fontSize :' 1.2rem'}}>
            <TextareaAutosize
                aria-label="empty textarea"
                placeholder="   یادداشت ... "
                style={{ width: '100%', height: 40 }}
                value={note}
                onChange={ handleInputNote}
            />
        </Typography>


    )
}

export default InputAddNote
