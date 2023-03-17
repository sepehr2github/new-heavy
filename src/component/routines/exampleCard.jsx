import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Typography ,Menu ,MenuItem } from '@mui/material'
import { deleteExercise ,createSuperSet} from '../../store/slice/exerciseSlice'
import { updateDeleteExercise, addReplace , updatecreateSuperSet} from '../../store/slice/routinesdaySlice'
import { useDispatch } from 'react-redux'

const ITEM_HEIGHT = 48;

export default function LongMenuExercise({ Id , seperator, getReplace ,getSuperSet,getSuperSetId }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch()
    const handleDelete = () => {
        if (seperator == 1) { dispatch(deleteExercise(Id)) }
        if (seperator == 2) { dispatch(updateDeleteExercise(Id)) }
    }
    const handleReplace = () => {
        getReplace(true)
        if (seperator == 1) { dispatch(deleteExercise(Id)) }
        if (seperator == 2) { dispatch(updateDeleteExercise(Id)) }
    }
    const handleSuperSet = () => {
        dispatch(createSuperSet(Id))  
        getSuperSet(true)
        getSuperSetId(Id)
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

                <MenuItem onClick={handleDelete} key={1} >
                    <button><Typography>  حذف </Typography></button>
                </MenuItem>
                <MenuItem onClick={handleReplace} key={2} >
                    <button><Typography>  جایگزینی </Typography>  </button>
                </MenuItem>
                <MenuItem onClick={handleSuperSet} key={3} >
                    <button><Typography> سوپرست </Typography></button>
                </MenuItem>
            </Menu>
        </div>
    );
}
