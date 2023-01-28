import React, { useState, useEffect } from 'react'
import {
    Grid, Card, CardHeader, FormControl,
    MenuItem, TextareaAutosize, Typography, CardContent, IconButton, InputLabel, Avatar, MenuList, ListItemIcon, ListItemText, Modal
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

import ButtunDeleteExercise from './buttunDeleteExercise'
import DeleteIcon from '@mui/icons-material/Delete';
import ExampleCard from './exampleCard';


const options = [
    'delete',

];

const ITEM_HEIGHT = 48;

const CardSelect = (props) => {

    const dispatch = useDispatch()
    const [REPS, setREPS] = useState()
    const [kg, setKg] = useState()
    const [timer, setTimer] = useState();
    const [count, setCount] = useState(1)
    const [note, setNote] = useState("")
    const list = useSelector(state => state.exercise.list)

    const handleSet = (option) => {
        dispatch(addSet(option))
    }

    const handleDeleteSet = ({ indexSet, id }) => {
        dispatch(deleteSet({ indexSet, id }))

    }
    console.log(list);


    return (
        <div >
            <InputAddTitle separator={1} />
            {list?.map((item, ind) =>
                <div className="shadow-xl p-1">
                    <Card key={item.key} sx={{ maxWidth: 700, marginTop: 5 }} >
                        <CardHeader className='mt-4 mx-3'
                            avatar={
                                <Avatar className='' aria-label="recipe">
                                    <img className='imglist' src={"item?.avatar"} />
                                </Avatar>
                            }
                            action={<ExampleCard seperator={1} Id={item.key} />}
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
                                                  
                                                  <InputAddNumber key={Ind} Id={item?.key} separator={1} Ind={Ind} IndexSet={indexSet} Index_Id={type.index_id} unit={set.unit} amount={ set.map((inp) =>[{index_id : inp[0]?.index_id ,amount : inp[0].amount}]  )  } />
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
            )
            }
        </div>
    )
}

export default CardSelect




















