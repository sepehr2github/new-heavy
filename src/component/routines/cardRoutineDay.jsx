import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';

import {
    Grid, Card, CardHeader, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper,
    Box, Button, Hidden, Typography, CardContent, Avatar, Modal, Popover
} from '@mui/material';

import AvTimerIcon from '@mui/icons-material/AvTimer';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { setRoutes, addSetUpdate, setSuperSet, deleteSuperSetHistory } from '../../store/slice/routinesdaySlice';
import { createHistory } from '../../store/slice/history'
import { deleteSet } from '../../store/slice/routinesdaySlice'
import CheckBox from './checkBox';
import InputAddRestTimer from './input/inputAddRestTimer';
import InputAddNumberRoutinDay from './input/addNumberRoutinDay';
import InputAddNote from './input/inputAddNote';
import LongMenu from './exampleRoutinCard';
import routinApi from '../axiosApi/axiosRoutin'
import MenuExercise from './menuExercise';
import TimerRoutin from './timerRoutin'
import ListExercisesRoutin from './listExercisesRoutin';
import CircularUnderLoad from '../loading/loading';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { textAlign } from '@mui/system';
import Media from '../loading/skeleton';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';

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
    const [successAPI, setSuccessAPI] = useState(true)
    const [start, setStart] = useState(null)
    const [Successfull, setSuccessfull] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {

        const getRoutine = async (url) => {
            await routinApi.get(`/routine/${param.id}`).then(result => {
                dispatch(setRoutes(result.data.data));
                dispatch(setSuperSet(result?.data?.super_set))
                setSuccessAPI(false)
            }).catch(err => console.log(err))
        }
        getRoutine()
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
    // popOver

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setTimeout(() => {

            setAnchorEl(null);

        }, 1000);
    };

    const [anchorel, setAnchorel] = React.useState(null);
    const openMobile = Boolean(anchorel);
    const handlePopoverOpenMobile = (event) => {
        setAnchorel(event.currentTarget);
        setTimeout(() => {
            setAnchorel(null);
        }, 1000);
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
            setError(false)
        } else if (numberSet.length !== numberdone && numberdone !== 0) {
            setError(true)
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


    // create superset 
    const [openSuperSet, setOpenSuperSet] = useState(false)
    const handleOpenSuperSet = () => setOpenSuperSet(true)
    const handleCloseSuperSet = () => setOpenSuperSet(false)

    const handleSuperSet = (superSet) => {
        if (superSet) return (
            handleOpenSuperSet())
    }

    const [superSetKey, setSuperSetKey] = useState()
    const addSuperSet = (id) => {
        setSuperSetKey(id)
    }

    const handleDeleteSuperSetHistory = ({ id, IndexSuper }) => {
        dispatch(deleteSuperSetHistory({ id, IndexSuper }))
    }

    useEffect(() => {

        if (history.timer > 5) {
            routinApi.post(`/routine/history`, history).then(res => setSuccessfull(true)).catch(err => console.log(err))
        }

    }, [history])

    if (Successfull) { return <Navigate to='../' /> }

    return (
        <>
            <div className='lg:container md:direction: rtl mx-auto ' >
                {error ?
                    <>
                        <Stack className='place-items-center' sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="warning">
                                <AlertTitle>Warning</AlertTitle>
                                لطفا تمام ست ها را انجام دهید
                            </Alert>
                        </Stack>
                        {setTimeout(() => {
                            setError(false)
                        }, 3000)}
                    </>
                    : ''
                }
                <div className='exercise-box  lg:flex sm:w-full  lg:mr-21 ' >
                    <div className='exercise-left hidden max-lg:w-full mb-5  lg:ml-7 lg:inline '>
                        <MenuExercise separator={2} />
                    </div>
                    <div className="exercise-right max-md:w-full mb-5 lg:w-4/6 md:mr-4  md:ml-10 mt-6 ">
                        <>
                            <>
                                <div className='hidden md:flex'>
                                    <div className={`${start ? 'hidden' : 'flex'}`} > <Button onClick={handleStartRoutin} variant="contained" color='success' className=' h-10  button float-left '> <Typography> شروع روتین </Typography></Button></div>
                                    <div className={`${start ? 'flex' : 'hidden'} `}> <Button onClick={handleEndRoutin} variant="contained" color='success' className=' h-10  button float-right '> <Typography> اتمام روتین </Typography></Button></div>
                                    <div className='mr-20'> <TimerRoutin start={start} /> </div>
                                </div>

                                <div className=' md:hidden'>
                                    <div className={`mb-3 justify-center ${start ? 'hidden' : 'flex'}`}> <Button onClick={handleStartRoutin} color='success' variant="contained" className=' h-10  button '> <Typography className=' '> شروع روتین </Typography></Button></div>
                                    <div className={`mb-3 justify-center ${start ? 'flex' : 'hidden'}`}> <Button onClick={handleEndRoutin} variant="contained" color='success' className=' h-10  button  '> <Typography> اتمام روتین </Typography></Button></div>
                                    <div className='flex'> <TimerRoutin start={start} /> </div>
                                </div>
                            </>

                            <>
                                {!list[0] ? <div className='mt-10'> <Media /></div> :

                                    list[0]?.routine_items?.map((routes) =>
                                        <Card key={routes.id} sx={{ maxWidth: 700, marginTop: 5 }}  >
                                            <CardHeader className='mt-5'

                                                avatar={
                                                    !list ?
                                                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                                        :
                                                        <>
                                                            <Avatar aria-label="recipe">
                                                                <img className='imglist' />
                                                            </Avatar>
                                                        </>
                                                }

                                                action={<LongMenu Id={routes?.id} exercise_id={routes.exercise_id} getSuperSet={(superSet) => handleSuperSet(superSet)} getSuperSetRoutin={(id) => addSuperSet(id)} getReplace={(replace) => handleReplace(replace)} seperator={2} />}
                                                title={
                                                    <>
                                                        <h1 className='title-card '>{routes?.exercise.fa_title}</h1>
                                                        <>
                                                            <div className='hidden md:flex'>
                                                                {super_set?.map((item, index) => item?.map((setId, ind) => setId?.id == routes?.exercise_id ?
                                                                    <div>
                                                                        <div
                                                                            onDoubleClick={() => handleDeleteSuperSetHistory({ id: item[0].id, IndexSuper: index })}
                                                                            aria-owns={open ? 'mouse-over-popover' : undefined}
                                                                            aria-haspopup="true"
                                                                            onMouseEnter={handlePopoverOpen}
                                                                            className={`super_set ${index == 0 ? ' bg-[#f97316]' : index == 1 ? 'bg-[#06b6d4]' : index == 2 ? 'bg-[#d946ef]' : ''}`}
                                                                        >
                                                                            <Typography className='text-white-500'>  {index + 1}</Typography>
                                                                        </div>
                                                                        <Popover
                                                                            id="mouse-over-popover"
                                                                            sx={{
                                                                                pointerEvents: 'none',
                                                                            }}
                                                                            open={open}
                                                                            anchorEl={anchorEl}
                                                                            anchorOrigin={{
                                                                                vertical: 'bottom',
                                                                                horizontal: 'left',
                                                                            }}
                                                                            transformOrigin={{
                                                                                vertical: 'top',
                                                                                horizontal: 'left',
                                                                            }}
                                                                            // onClose={handlePopoverClose}
                                                                            disableRestoreFocus
                                                                        >
                                                                            <Typography sx={{ p: 1 }}> برای حذف دبل کلیک کنید</Typography>
                                                                        </Popover>
                                                                    </div>
                                                                    : '')
                                                                )}
                                                            </div>
                                                            <div className='flex md:hidden'>
                                                                {super_set?.map((item, index) => item?.map((setId, ind) => setId?.id == routes?.exercise_id ?
                                                                    <div>
                                                                        <div
                                                                            onTouchEndCapture={() => handleDeleteSuperSetHistory({ id: item[0].id, IndexSuper: index })}
                                                                            aria-owns={open ? 'mouse-over-popover' : undefined}
                                                                            aria-haspopup="true"
                                                                            onTouchStart={handlePopoverOpenMobile}
                                                                            className={`super_set ${index == 0 ? ' bg-[#f97316]' : index == 1 ? 'bg-[#06b6d4]' : index == 2 ? 'bg-[#d946ef]' : ''}`}
                                                                        >
                                                                            <Typography className='text-white-500'>  {index + 1}</Typography>
                                                                        </div>
                                                                        <Popover
                                                                            id="mouse-over-popover"
                                                                            sx={{
                                                                                pointerEvents: 'none',
                                                                            }}
                                                                            open={openMobile}
                                                                            anchorEl={anchorel}
                                                                            anchorOrigin={{
                                                                                vertical: 'bottom',
                                                                                horizontal: 'left',
                                                                            }}
                                                                            transformOrigin={{
                                                                                vertical: 'top',
                                                                                horizontal: 'left',
                                                                            }}
                                                                            // onClose={handlePopoverClose}
                                                                            disableRestoreFocus
                                                                        >
                                                                            <Typography sx={{ p: 1 }}> برای حذف نگه دارید</Typography>
                                                                        </Popover>
                                                                    </div>
                                                                    : '')
                                                                )}
                                                            </div>
                                                        </>

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
        </>
    )

}
export default CardRoutineDay