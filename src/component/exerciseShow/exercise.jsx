import React, { useState, useEffect } from 'react';
import Navbar from '../layout/navbar';
import '../../App.css';
import '../../index.css';
import { Paper, Box, Hidden, Button, Typography, Modal,Grid } from '@mui/material';
import CardExercise from './cardExercise';
import LabelBottomNavigation from '../layout/buttomNavigation';
import MenuExercise from '../routines/menuExercise';
import { useSelector } from 'react-redux';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Exercise = () => {

    const list = useSelector(state => state.exerciseShow.list)

    const [openList, setOpenList] = React.useState(false);
    const handleOpenList = () => setOpenList(true);
    const handleCloseList = () => setOpenList(false);

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
    // response mobile hiden button
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (

        <div className='newRoutin-style  md:direction: rtl' >
            <Navbar />

            <div className='lg:container mx-auto'>
                <div className='exercise-box md:pt-5 md:px-8 md:flex lg:flex sm:w-full lg:mr-21 ' >
                    <div className='exercise-left hidden  max-md:w-full mb-5  lg:ml-7 md:inline '>
                        <MenuExercise separator={1} />
                    </div>
                    <div className="exercise-right max-md:w-full mb-5 w-full md:w-4/6 md:ml-14 mt-8 md:mr-1">
                        <div className="mt-1">
                            <Grid item xs={3} md={3}>
                             
                             
                            </Grid>
                            <Paper elevation={3} className="mt-4   ">
                                <div className="w-full ">
                                    {list.length > 0 ? <CardExercise /> :
                                        <div className='emptyRight '>
                                            <FitnessCenterIcon color="primary" className="fitnessIcon" sx={{ fontSize: 80 }} />
                                            <Typography> لطفا یک ورزش انتخاب کنید</Typography>
                                        </div>
                                    }
                                </div>
                            </Paper>
                            <div className="mt-5">
                                <Hidden mdUp >
                                    <Button onClick={handleOpen} className="float-end h-10 button "
                                        color="primary" variant="contained" ><Typography> اضافه کردن ورزش</Typography>
                                    </Button>
                                </Hidden>
                            </div>
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
                    </div>
                </div>
            </div>
        </div >
    );
}


export default Exercise;



