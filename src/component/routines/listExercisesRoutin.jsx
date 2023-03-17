import React from "react"
import { List, ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Box, Paper, InputBase, IconButton, Modal, Button } from '@mui/material'
import { useDispatch, useSelector } from "react-redux"
import { updateAddSuperSet } from "../../store/slice/routinesdaySlice"


const ListExercisesRoutin = ({SuperSetKey}) => {

    const list = useSelector(state => state.routinesday.list)
    const dispatch = useDispatch()

    const handleList = (id ) => {
        dispatch(updateAddSuperSet({ id, SuperSetKey })) 
    }

    return (
        <List sx={{
            direction: 'rtl', width: '100%', marginTop: 5,
            bgcolor: 'background.paper', maxHeight: 360, maxWidth: 360, position: 'relative', overflow: 'auto',
        }}>
            <Typography> لیست ورزش های شما</Typography>
            {list[0]?.routine_items?.map((option, index) =>
               option.id !== SuperSetKey?
                <button
                    key={index}
                    onClick={() => handleList(option?.exercise_id)}
                    className="list-button hover:bg-gray-100">
                    <ListItem   key={index}>
                        <ListItemAvatar className='mb-2'>
                            <Avatar alt="Remy Sharp" sx={{ width: 50, height: 50 }} />
                        </ListItemAvatar>
                        <ListItemText
                            className='mr-5 pt-1'
                           
                            primary={
                                <Typography>
                                    {option?.exercise.fa_title}
                                </Typography>
                            }
                        />
                    </ListItem>
                </button> : ''
            )}
        </List>
    )



}

export default ListExercisesRoutin