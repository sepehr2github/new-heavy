import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate, Outlet } from 'react-router-dom';

import {
    Grid, Card, CardHeader, FormControl, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper,
    Box, TextField, InputBase, List, ListItem, ListItemAvatar, Button, Hidden,
    MenuItem, TextareaAutosize, Typography, CardContent, IconButton, InputLabel, Avatar, MenuList,
    ListItemIcon, ListItemText, Modal
} from '@mui/material';


import AvTimerIcon from '@mui/icons-material/AvTimer';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import Badge from '@mui/material/Badge';
import { updateDeleteExercise, setRoutes, addSetUpdate, setSuperSet, deleteSuperSetHistory } from '../../store/slice/routinesdaySlice';
import { createHistory, addTimer } from '../../store/slice/history'
import { deleteSet ,updatecreateSuperSet } from '../../store/slice/routinesdaySlice'
import CheckBox from './checkBox';
import UrgeWithPleasureComponent from './progressBar'

import InputAddRestTimer from './input/inputAddRestTimer';
import InputAddNumberRoutinDay from './input/addNumberRoutinDay';
import InputAddNote from './input/inputAddNote';
import ExamleRoutineCard from './examleRoutineCard';
import routinApi from '../axiosApi/axiosRoutin'
import Alert from './alert';
import RestTimePage from './restTimePage'
import MenuExercise from './menuExercise';
import Fit2 from '../../img/fit2.jpg';
import App from '../../App'
import Routines from './routines';
import TimerRoutin from './timerRoutin'
import ListExercisesRoutin from './listExercisesRoutin';

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

const CardRoutineDay = () => {

    const history = useSelector(state => state.historyRoutin.list)
    const list = useSelector(state => state.routinesday.list)
    const super_set = useSelector(state => state.routinesday.super_set)

    const param = useParams()
    const dispatch = useDispatch()
    const [route, setRoute] = useState()
    const [successAPI, setSuccessAPI] = useState(true)
    const [start, setStart] = useState(null)
    const [Successfull, setSuccessfull] = useState(false)
    const [newList, setNewList] = useState()
    const [superSet, SetSuperSet] = useState([])

    useEffect(() => {

        if (successAPI == true) {
            const getRoutinApi = async () => {
                await routinApi.get(`/routine/${param.id}`).then(result => {
                    dispatch(setRoutes(result.data.data));
                    dispatch(setSuperSet(result?.data?.super_set))
                    setSuccessAPI(false)
                }).catch(err => console.log(err))
            }
            getRoutinApi()
        }
    }, [])


    useEffect(() => {
        if (successAPI == true) {
            routinApi.get(`/routine/history/show/${param.id}`).then(result => {
                console.log(result)
            })
                .catch(err => console.log(err))
        };
    }, [])

    const handleAddSet = (Id) => {
        dispatch(addSetUpdate(Id))
    }

    // // response mobile hiden button
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // rest time progres
    const [openModalRest, setOpenModalRest] = useState(false);
    const handleCloseModalRest = () => setOpenModalRest(false);

    // create history
    const [numberSet, setnumberSet] = useState([])
    const [numberdone, setNumberdone] = useState(0)


    useEffect(() => {
        dispatch(createHistory(list))

    }, [list])

    const handleStartRoutin = () => {
        setStart(true)

    }

    const handleEndRoutin = () => {
        list[0]?.routine_items.map((item) => item.routine_sets.map((sets, index) => setnumberSet(previousState => { return [...previousState, [index]] })))

        list[0]?.routine_items.map((item) => item.routine_sets.map((sets, index) => setNumberdone(prev => (sets.done == true ? prev + 1 : prev))))
    }

    useEffect(() => {

        if (numberSet.length == numberdone && numberdone !== 0) {
            setStart(false)

        } else if (numberSet.length !== numberdone && numberdone !== 0) {
            alert('لطفا تمام حرکات ورزشی را انجام دهید')
            setNumberdone(0)
            setnumberSet([])
        }
    }, [numberdone > 0])

    const handleDeleteSet = ({ indexSet, id }) => {
        dispatch(deleteSet({ indexSet, id }))
    }

    const handleReplace = (replace) => {
        if (replace) return (
            handleOpenModal()
        )
    }

    const [openSuperSet, setOpenSuperSet] = useState(false)
    const handleOpenSuperSet = () => setOpenSuperSet(true)
    const handleCloseSuperSet = () => setOpenSuperSet(false)

    const handleSuperSet = (superSet) => {
        if (superSet) return (
            handleOpenSuperSet()
        )
    }

    const [superSetKey, setSuperSetKey] = useState()
    const addSuperSet = (id) => {
        console.log(id)
        setSuperSetKey(id)
    }



    useEffect(() => {

        if (history.timer > 5) {
            routinApi.post(`/routine/history`, history).then(res => setSuccessfull(true)).catch(err => console.log(err))
        }

    }, [history])


    const handleDeleteSuperSetHistory = ({ id, IndexSuper }) => {
        dispatch(deleteSuperSetHistory({ id, IndexSuper }))

    }


    if (Successfull) { return <Outlet /> }

    return (
        <div className='lg:container md:direction: rtl mx-auto ' >
            <div className='exercise-box  lg:flex sm:w-full  lg:mr-21 ' >
                <div className='exercise-left hidden max-lg:w-full mb-5  lg:ml-7 lg:inline '>
                    <MenuExercise separator={2} />
                </div>
                <div className="exercise-right max-md:w-full mb-5 lg:w-4/6 md:mr-4  md:ml-10 mt-6 ">
                    <>
                        <>
                            <div className='hidden md:flex'>
                                <div className={`${start ? 'hidden' : 'flex'}`}   > <Button onClick={handleStartRoutin} variant="contained" color='success' className=' h-10  button float-left '> <Typography> شروع روتین </Typography></Button></div>
                                <div className={`${start ? 'flex' : 'hidden'} `} > <Button onClick={handleEndRoutin} variant="contained" color='success' className=' h-10  button float-right '> <Typography> اتمام روتین </Typography></Button></div>
                                <div className='mr-20'> <TimerRoutin start={start} /> </div>
                            </div>

                            <div className=' md:hidden'>
                                <div className={` mb-3 justify-center ${start ? 'hidden' : 'flex'}`}   > <Button onClick={handleStartRoutin} color='success' variant="contained" className=' h-10  button '> <Typography className=' '> شروع روتین </Typography></Button></div>
                                <div className={`mb-3 justify-center ${start ? 'flex' : 'hidden'} `} > <Button onClick={handleEndRoutin} variant="contained" color='success' className=' h-10  button  '> <Typography> اتمام روتین </Typography></Button></div>
                                <div className='flex'> <TimerRoutin start={start} /> </div>
                            </div>
                        </>

                        <>

                            {list[0]?.routine_items?.map((routes) =>
                                <Card key={routes.id} sx={{ maxWidth: 700, marginTop: 5 }}  >
                                    <CardHeader className='mt-5'

                                        avatar={<>

                                            <Avatar aria-label="recipe">
                                                <img className='imglist' />
                                            </Avatar>
                                        </>
                                        }

                                        action={<ExamleRoutineCard Id={routes?.id} exercise_id={routes.exercise_id} getSuperSet={(superSet) => handleSuperSet(superSet)} getSuperSetRoutin={(id) => addSuperSet(id)} getReplace={(replace) => handleReplace(replace)}  seperator={2} />}
                                        title={
                                            <>
                                                {super_set?.map((item, index) => item?.map((setId, ind) => setId?.id == routes?.exercise_id ?
                                                    <div className="super_set"><button onDoubleClick={() => handleDeleteSuperSetHistory({ id: item[0].id, IndexSuper: index })}> <Typography> {index + 1}</Typography></button> </div> : '')
                                                )}


                                                <h1 className='title-card '>{routes?.exercise.fa_title}</h1>
                                            </>
                                        }
                                    />
                                    <CardContent className='mb-0'>
                                        <Typography variant="body2" color="text.secondary">
                                            <InputAddNote Id={routes.id} amount={routes?.note} />
                                        </Typography>
                                    </CardContent>
                                    <div className='restTimer mt-0' xs={12}>
                                        <InputAddRestTimer separator={2} Id={routes?.id} amount={routes?.rest_timer} />
                                        <h1 className="m-3 restTimerTitle ">
                                            <AvTimerIcon />  <Typography> زمان استراحت</Typography>
                                        </h1>
                                    </div>
                                    <TableContainer sx={{ width: "100%" }} component={Paper}>
                                        <Table className='mr-0 ml-0' size="meduim" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow className='' >
                                                    <TableCell className='' align="right" ><CheckIcon className='mr-2' /></TableCell>
                                                    <TableCell className='' align="right"><Typography>ست</Typography></TableCell>
                                                    {routes.exercise?.type.indices?.map((type, ind) => <TableCell className='' key={ind} align="center"><Typography>{type.title}</Typography></TableCell>)}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody  >
                                                {routes?.routine_sets?.map((sets, indexSet) =>
                                                    <>
                                                        <TableRow key={indexSet} className={`${sets?.done == true ? 'row-done' : ''} `} >
                                                            <TableCell className='bg-emerald-50  w-4 md:w-10' align="right"> {start == true ? <CheckBox className='mr-2' IdSet={indexSet} IdEx={routes.id} amount={routes?.rest_timer} /> : ''} </TableCell>
                                                            <TableCell className='bg-emerald-50 w-4 md:w-10' align="right" > {indexSet + 1}</TableCell>
                                                            {/* <TableCell align="center" > -</TableCell> */}
                                                            {sets?.amount?.map((item, index) =>
                                                                // console.log(item ,  item[0].index_id)
                                                                <TableCell className='' align="center" key={indexSet} >
                                                                    {
                                                                        <InputAddNumberRoutinDay key={index} IndexSet={indexSet} Id={routes.id} separator={2} Index_Id={item[0]?.index_id}
                                                                            SetId={sets.id} amountDay={item} unit={sets.unit} />
                                                                    }
                                                                </TableCell>
                                                            )}
                                                            <TableCell align="left"> <ClearIcon className=' hover:text-teal-500 hover hover:bg-gray-50' fontSize="small" color="disabled" onClick={() => handleDeleteSet({ indexSet: indexSet, id: routes.id })} /></TableCell>

                                                        </TableRow>
                                                    </>
                                                )}
                                            </TableBody>

                                        </Table>
                                    </TableContainer >

                                    <Grid sx={{ m: 3 }}  >
                                        <Button sx={{ width: '100%' }} onClick={() => handleAddSet(routes.id)}
                                            size={'large'} variant="contained" className='float-end mt-5  h-10  button'>  <Typography className=''> اضافه کردن ست</Typography> </Button>
                                    </Grid>
                                    <Modal
                                        open={openSuperSet}
                                        onClose={handleCloseSuperSet}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style} className='exercise-left'>
                                            <ListExercisesRoutin SuperSetKey={superSetKey} />
                                        </Box>
                                    </Modal>
                                </Card>
                            )
                            }

                            <div className='mt-3'>
                                <Hidden lgUp>
                                    <Button onClick={handleOpenModal} className="float-end mt-5  h-10  button" color="primary" variant="contained"> <Typography> اضافه کردن ورزش </Typography></Button>
                                </Hidden>
                            </div>

                        </>

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
                    </>

                </div>
            </div>
        </div >
    )

}
export default CardRoutineDay