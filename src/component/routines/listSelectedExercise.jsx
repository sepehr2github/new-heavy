import React from "react"
import { List, ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Box, Paper, InputBase, IconButton, Modal, Button } from '@mui/material'
import { useDispatch, useSelector } from "react-redux"
import { addSuperSet } from "../../store/slice/exerciseSlice"
import { UpdateAddSuperSet } from "../../store/slice/routinesdaySlice"

const ListSelectedExercise = ({ SuperSetKey, seperator }) => {

    const list = useSelector(state => state.exercise.list)
    const dispatch = useDispatch()

    console.log(SuperSetKey)


    const handleList = (id) => {
         dispatch(addSuperSet({ id, SuperSetKey })) 
    }


    return (
        <List sx={{
            direction: 'rtl', width: '100%', marginTop: 5,
            bgcolor: 'background.paper', maxHeight: 360, maxWidth: 360, position: 'relative', overflow: 'auto',
        }}>
            <Typography> لیست ورزش های شما</Typography>
            {list?.map((option, index) =>
             option.key !== SuperSetKey?
                <button
                    key={index}
                    onClick={() => handleList(option.id)}
                    className="list-button hover:bg-gray-100">
                    <ListItem alignItems="flex-start  " key={index}>
                        <ListItemAvatar className='mb-2'>
                            <Avatar alt="Remy Sharp" sx={{ width: 50, height: 50 }} />
                        </ListItemAvatar>
                        <ListItemText
                            className='mr-5 pt-1'
                            alignItems="flex-start"
                            primary={
                                <Typography>
                                    {option.fa_title}
                                </Typography>
                            }
                        />
                    </ListItem>
                </button> :''
            )  }
        </List>
    )



}

export default ListSelectedExercise