import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom'
import {
    Grid, Card, CardHeader, FormControl, MenuItem, TextareaAutosize,
    Typography, CardContent, IconButton, InputLabel, Avatar, Table,
    TableCell, TableContainer, TableHead, TableBody, TableRow, Paper,
    Menu, Modal, Hidden, ListItemAvatar, ListItemText, Box,
    List, ListItem, Input, Divider, InputBase, TextField, Button
} from '@mui/material';


import MoreVertIcon from '@mui/icons-material/MoreVert';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { setRoutes, updateAddExercise, addSetUpdate, updateDeleteExercise, deleteSet } from '../../../store/slice/routinesdaySlice';
import { createUpdateRoutes, setUpdateRoutes } from '../../../store/slice/updateRoutineSlice';
// import CheckBox from '../checkBox';

import Navbar from '../../layout/navbar'
import LabelBottomNavigation from '../../layout/buttomNavigation'
import InputAddNumberRoutinDay from '../input/addNumberRoutinDay';
import InputAddRestTimer from '../input/inputAddRestTimer'
import InputAddNote from '../input/inputAddNote';
import InputAddTitle from '../input/inputAddTitle';
import ExampleCard from '../exampleCard';
import MenuExercise from '../menuExercise';
import Routines from '../routines';
import routinApi from '../../axiosApi/axiosRoutin';
import axios from 'axios'

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
};

const EditeRoutin = () => {

    const param = useParams()
    const dispatch = useDispatch()

    const list = useSelector(state => state.routinesday.list)
    const updateRoute = useSelector(state => state.updateRoutine.list)

    const [count, setCount] = useState(1)
    const [timer, setTimer] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [exercises, setExercises] = useState()
    const [equipments, setEquipments] = useState()
    const [muscles, setMuscles] = useState()
    const [route, setRoute] = useState()
    const [successAPI, setSuccessAPI] = useState(true)

    const ITEM_HEIGHT = 48;

    const open = Boolean(anchorEl)

    const idRoutine = list[0]?.id


    // get single route
    useEffect(() => {
        routinApi.get(`/routine/${param.id}`).then(result => dispatch(setRoutes(result.data.data))).then(setSuccessAPI(false))

    }, [])

    // add set
    const handleUpdateAddSet = (Id) => {
        dispatch(addSetUpdate(Id))
    }

    // add title and create new state 
    useEffect(() => {
        dispatch(createUpdateRoutes(list[0]?.title))

    }, [list])


    // send server
    const [newRoute, setNewRoute] = useState(false)
    const [successfull, setSuccessfull] = useState(false)

    const handleSendServer = () => {
        let newList = list[0]
        dispatch(setUpdateRoutes({ newList }))
        setNewRoute(true)
    }

    // send route update
    useEffect(() => {
        if (newRoute == true) {
            routinApi.post(`/routine/${idRoutine}`, updateRoute)
            setSuccessfull(true)
        }
    }, [newRoute])


    const handleDeleteSet = ({ indexSet, id }) => {
        dispatch(deleteSet({ indexSet, id }))
    }

    const handleReplace = (replace) => {
        if (replace) return (
            handleOpenModal()  ) }

    // // response mobile hiden button
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    if (successfull) { return <Navigate to='../routines'/> }
    return (
        <div className='routin-style '>

            <Navbar />
            <div className='  mx-auto lg:container md:direction: rtl mt-7' >
                <div className='exercise-box  lg:flex sm:w-full  lg:mr-21' >
                    <div className='exercise-left hidden max-md:w-full mb-5 lg:ml-7 lg:inline '>
                        <div>
                            <MenuExercise separator={2} />
                        </div>
                    </div>
                    <div className="exercise-right max-md:w-full mb-5 md:w-4/6 md:mr-4 md:ml-10 mt-6">
                        <Button onClick={handleSendServer} variant='contained' color='success' className='input-title float-right' > <h2 > ذخیره تغیرات</h2></Button>
                       <div className='title-edite ml-32 '>   <Typography >{list[0]?.title} </Typography></div> 

                        {list[0]?.routine_items?.map((routes) =>
                            < >
                                <Card className='' sx={{ maxWidth: 700, marginTop: 5 }} >
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe">
                                                <img className='imglist' src={"item?.avatar"} />
                                            </Avatar>
                                        }
                                        action={
                                            <ExampleCard Id={routes?.id} getReplace={(replace) => handleReplace(replace)} seperator={2}/>
                                        }
                                        title={
                                            <h1 className='title-card'>{routes.exercise.fa_title}</h1>
                                        }
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            <InputAddNote amount={routes.note} separator={2} Id={routes.id} />
                                        </Typography>
                                    </CardContent>
                                    <div className='restTimer' xs={12}>
                                        <InputAddRestTimer separator={2} Id={routes.id} amount={routes.rest_timer} />
                                        <h1 className="m-3 restTimerTitle ">
                                            <AvTimerIcon />  <Typography>: زمان استراحت  </Typography>
                                        </h1>
                                    </div>

                                    <TableContainer sx={{ width: "100%" }} component={Paper}>
                                        <Table className='mr-0 ml-0' size="meduim" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow className='' >
                                                    <TableCell align="center"><Typography>ست</Typography></TableCell>
                                                    {/* <TableCell align="center">PREVIOUS</TableCell> */}
                                                    {routes.exercise?.type?.indices?.map((type) => <TableCell key={type.id} align="center"><Typography>{type.title}</Typography></TableCell>)}
                                                </TableRow>
                                            </TableHead>

                                            <TableBody  >
                                                {routes?.routine_sets?.map((sets, indexSet) =>
                                                    <TableRow className={`${sets.done == true ? 'row-done' : ''}`} >
                                                        <TableCell align="center" > {indexSet + 1}</TableCell>
                                                        {/* <TableCell align="center" > -</TableCell> */}
                                                        {sets?.amount?.map((item) =>
                                                            <TableCell align="center"  >
                                                                {<>
                                                                    <InputAddNumberRoutinDay Id={routes.id} separator={2} Index_Id={item[0]?.index_id}
                                                                        SetId={sets.id}  amountDay={item} IndexSet={indexSet} unit={sets.unit} />
                                                                        </>
                                                                }
                                                            </TableCell>
                                                        )}
                                                        <TableCell align="left"> <ClearIcon className=' hover:text-teal-500 hover hover:bg-gray-50' fontSize="small" color="disabled" onClick={() => handleDeleteSet({ indexSet: indexSet, id: routes.id })} /></TableCell>

                                                    </TableRow>
                                                )}
                                            </TableBody>

                                        </Table>
                                    </TableContainer >
                                    <Grid sx={{ m: 3 }} xs={12} >
                                        <Button sx={{ width: '100%' }}
                                            onClick={() => handleUpdateAddSet(routes.id)} size={'large'}
                                            variant="contained">+ Add Set</Button>
                                    </Grid>
                                </Card>
                            </>
                        )}
                        <Hidden mdUp>
                            <Button onClick={handleOpenModal} className="float-end  h-10 button " color="primary" variant="contained" ><Typography> اضافه کردن ورزش</Typography>
                            </Button>
                        </Hidden>
                        <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style} className='exercise-left'>
                                <MenuExercise separator={2} />
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditeRoutin
