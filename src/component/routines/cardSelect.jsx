import React, { useState, useEffect } from 'react'
import {
    Hidden, Card, CardHeader, Box,
    MenuItem, TextareaAutosize, Typography, CardContent, Avatar, MenuList, ListItemIcon, ListItemText, Modal
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import Select from '@mui/material/Select';
import Fit1 from "../../img/fit1.jpg";
import Fit2 from "../../img/fit2.jpg";
import Fit3 from "../../img/fit3.jpg";
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { addTimer, addSet } from '../../store/slice/exerciseSlice';
import { deleteSet } from '../../store/slice/exerciseSlice'

import Menu from '@mui/material/Menu';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper } from '@mui/material';

import InputAddTitle from './input/inputAddTitle'
import InputAddNumber from './input/inputAddNumber';
import InputAddNote from './input/inputAddNote';
import InputAddRestTimer from './input/inputAddRestTimer'
import ClearIcon from '@mui/icons-material/Clear';
import MenuExercise from './menuExercise';
import ButtunDeleteExercise from './buttunDeleteExercise'
import DeleteIcon from '@mui/icons-material/Delete';
import ExampleCard from './exampleCard';
import ListSelectedExercise from './listSelectedExercise';


const options = [
    'delete',

];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    marginTop: 7
};


const ITEM_HEIGHT = 48;

const CardSelect = (props) => {

    const dispatch = useDispatch()
    const list = useSelector(state => state.exercise.list)
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [openSuperSet, setOpenSuperSet] = useState(false)
    const handleOpenSuperSet = () => setOpenSuperSet(true)
    const handleCloseSuperSet = () => setOpenSuperSet(false)

    const handleSet = (option) => {
        dispatch(addSet(option))
    }

    const handleDeleteSet = ({ indexSet, id }) => {
        dispatch(deleteSet({ indexSet, id }))

    }

    const handleReplace = (replace) => {
        if (replace) return (
            handleOpen()
        )
    }

    const handleSuperSet = (superSet) => {
        if (superSet) return (
            handleOpenSuperSet()

        )
    }

    const [superSetKey, setSuperSetKey] = useState()
    const addSuperSet = (id) => {
        console.log(id);
        setSuperSetKey(id)
    }

    return (
        <div >
            <InputAddTitle separator={1} />
            {list?.map((item, ind) =>
                <>
                    <div className="shadow-xl p-1">
                        <Card key={item.key} sx={{ maxWidth: 700, marginTop: 5 }} >
                            <CardHeader className='mt-4 mx-3'
                                avatar={
                                    <Avatar className='' aria-label="recipe">
                                        <img className='imglist' src={"item?.avatar"} />
                                    </Avatar>
                                }
                                action={<ExampleCard getSuperSet={(superSet) => handleSuperSet(superSet)} getSuperSetId={(id) => addSuperSet(id)} getReplace={(replace) => handleReplace(replace)} seperator={1} Id={item.key} />}
                                title={<h1 className='title-card'>{item.fa_title}</h1>}
                            />
                            {/* <button > delete</button> */}
                            <CardContent>
                                <InputAddNote separator={1} Id={item.key} />
                            </CardContent>
                            <div className='restTimer' xs={12}>
                                <InputAddRestTimer separator={1} Id={item.key} />
                                <h1 className="m-3 restTimerTitle ">
                                    <AvTimerIcon />  <Typography> زمان استراحت</Typography>
                                </h1>
                            </div>
                            <TableContainer sx={{ width: "100%" }} component={Card}>
                                <Table className='mr-0 ml-0' size="meduim" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow className='' >
                                            <TableCell className="input-title" align="center"><h2>ست</h2> </TableCell>
                                            {item.type.map((type) => <TableCell className="input-title" align="center"><h2>{type.title}</h2></TableCell>)}
                                        </TableRow>
                                    </TableHead>
                                    {item?.sets?.map((set, indexSet) =>
                                        <TableBody key={set?.key} >
                                            <TableRow >
                                                <TableCell align="center" > {indexSet + 1}</TableCell>
                                                {item.type.map((type, Ind) =>
                                                    <TableCell align="center">

                                                        <InputAddNumber key={Ind} Id={item?.key} separator={1} Ind={Ind} IndexSet={indexSet} Index_Id={type.index_id} unit={set.unit} amount={set.map((inp) => [{ index_id: inp[0]?.index_id, amount: inp[0].amount }])} />
                                                    </TableCell>
                                                )}
                                                <TableCell align="left"> <ClearIcon className=' hover:text-teal-500 hover hover:bg-gray-50' fontSize="small" color="disabled" onClick={() => handleDeleteSet({ indexSet: indexSet, id: item.key })} /></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )}
                                </Table>
                            </TableContainer >
                        </Card>

                        <div className='my-6'  >
                            <Button sx={{ width: '90%' }} onClick={() => handleSet(item.key)} size={'large'} variant="contained" className="float-end mt-5  h-10  button"><Typography > اضافه کردن ست</Typography></Button>
                        </div>
                    </div>

                    <Modal
                        open={openSuperSet}
                        onClose={handleCloseSuperSet}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} className='exercise-left'>
                            <ListSelectedExercise  seperator={1} SuperSetKey={superSetKey} />
                        </Box>
                    </Modal>

                </>
            )
            }

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='exercise-left'>
                    <MenuExercise separator={1} />
                </Box>
            </Modal>

        </div>
    )
}

export default CardSelect




















