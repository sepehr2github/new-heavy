import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { updateDeleteExercise, addReplace, updatecreateSuperSet } from '../../store/slice/routinesdaySlice'
import { Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Fragment } from 'react'
const ITEM_HEIGHT = 48;

export default function LongMenu({ Id, getReplace, getSuperSet, getSuperSetRoutin }) {

    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleDelete = () => {
        dispatch(updateDeleteExercise(Id))
    }
    const handleReplace = () => {
        getReplace(true)
        dispatch(updateDeleteExercise(Id))
    }
    const handleSuperSet = () => {
        dispatch(updatecreateSuperSet(Id))
        getSuperSet(true)
        getSuperSetRoutin(Id)
    }
    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem MenuItem>
                    <button onClick={handleDelete}> <Typography>  حذف </Typography> </button>
                </MenuItem>
                <MenuItem MenuItem >
                    <button onClick={handleReplace}>   <Typography>  جایگزینی </Typography></button>
                </MenuItem>
                <MenuItem MenuItem>
                    <button onClick={handleSuperSet}><Typography> سوپرست </Typography>  </button>
                </MenuItem>
            </Menu>
        </div>
    );
}
