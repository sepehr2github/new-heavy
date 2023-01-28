import React, { useState, useEffect } from 'react';
import Navbar from '../layout/navbar';
import '../../App.css';
import '../../index.css';
import { Paper, Box ,Hidden , Button , Typography ,Modal} from '@mui/material';
import CardExercise from './cardExercise';
import LabelBottomNavigation from '../layout/buttomNavigation';
import MenuExercise from '../routines/menuExercise';

const Exercise = ()=> {

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



    return (

        <div className='newRoutin-style  md:direction: rtl' >
            <Navbar />

            <div>
                <div className='exercise-box md:flex lg:flex sm:w-full lg:mr-21 '>
                    <div className='exercise-left hidden  max-md:w-full mb-5  lg:ml-7 md:inline'>
                        <Box  sx={{ '& .MuiTextField-root': { margin: '4px 0', width: '100%' }, }} noValidate autoComplete="off">
                        <MenuExercise separator={3} />

                        </Box >
                    </div>
                    <div className="exercise-right max-md:w-full mb-5 md:w-4/6 md:ml-14 mt-8 md:mr-7">
                        <Paper elevation={2}  >
                            <div className=" md:cardMD">
                            <CardExercise />
                                {/*list.length > 0 ?
                                 <CardExercise /> :
                                    <div className='emptyRight '>
                                        <FitnessCenterIcon color="primary" className="fitnessIcon" sx={{ fontSize: 80 }} />
                                        <Typography> لطفا یک ورزش انتخاب کنید</Typography>
                                    </div>
                                         */  }
                            </div>
                           <Hidden mdUp>
                                <Button onClick={handleOpenList} className="float-end h-10 button mr-7  "
                                    color="primary" variant="contained" ><Typography> انتخاب کردن ورزش</Typography>
                                </Button>
                            </Hidden>
                            <Modal
                                open={openList}
                                onClose={handleCloseList}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style} className='exercise-left'>
                                    <MenuExercise separator={3} />
                                </Box>
                            </Modal> 
                            {/* +<Box component="button" sx={{ display: { xl: 'none', xs: 'block' } }} /> */}
                        </Paper>
                    </div>
                </div>
            </div >
            <LabelBottomNavigation />
        </div >
    );
}


export default Exercise;



