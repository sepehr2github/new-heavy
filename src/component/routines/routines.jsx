import React, { useState, useEffect } from 'react';
import Navbar from '../layout/navbar';
import '../../App.css';
import { useDispatch } from 'react-redux';
import { Button, Box, Typography } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { Link, NavLink } from 'react-router-dom';
import { remove } from '../../store/slice/routinesdaySlice'
import { Remove } from '../../store/slice/exerciseSlice'
import { rEmove } from '../../store/slice/routineSlice'
import { createList, deleteRouteRedux } from '../../store/slice/titleRoutin'
import ExampleRoutines from './exampleRoutines'
import useSWR from 'swr';
import routineApi from '../axiosApi/axiosRoutin';
import axios from 'axios'
import Footer from '../layout/footer';
import { useSelector } from 'react-redux';

function Routines() {

    const dispatch = useDispatch()
    const routeTitle = useSelector(state => state.titleRoutin?.list)
    const [refresh, setRefresh] = useState(true)
    // const [routeTitle, setRoute] = useState()

    useEffect(() => {
        dispatch(remove())
        dispatch(Remove())
        dispatch(rEmove())
    }, [])

    axios.defaults.headers.get['Authorization'] = `Bearer ${localStorage.getItem("token")}`

    const getRoutine = (url) => {
        axios.get(url)
            .then(res => dispatch(createList(res.data.data)))
            .catch(err => console.log(err))
    }

    const { route } = useSWR(["http://188.121.121.255/api/v1/routine"], getRoutine)

    console.log(route);

    const deleteRoutes =  (Id) => {
         routineApi.delete(`/routine/${Id}`);
         dispatch(deleteRouteRedux({Id}))
    }

    return (
        <div className='routin-style' >
            <Navbar />
            <div className='hidden sm:block md:min-h-[35rem] mb-10'>
                <div className='routin-box md:flex mt-14'>
                    <div className=' max-md:w-full  mb-5 md:ml-3 lg:mr-8 lg:w-1/5 '>
                        <Button className='m-2 ' variant="outlined" startIcon={<ContentPasteIcon />}>
                            <Link className='p-2 fontB' to="newroutin"> <Typography > روتین جدید</Typography> </Link>
                        </Button>
                    </div>
                    <div className='routin-right md:w-full lg:w-4/6  ' >
                        <div className='displayStyle'><Typography className='pt-4 length-route'>روتین های من ({routeTitle?.length})</Typography ></div>
                        {routeTitle?.map((item, index) =>
                            <div key={index} className='displayStyle listBox '>
                                <NavLink to={`routinesDay/${item.id}`} > <Typography className='fontB'> {item.title}</Typography></NavLink>
                                <ExampleRoutines Id={item.id} deleteRoutes={deleteRoutes} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='block sm:hidden '>
                <div className='routinBoxMobile  mt-7'>
                    <div className=' max-md:w-full mb-5 '>
                        <Button className='m-2 ' variant="outlined" startIcon={<ContentPasteIcon />}>
                            <Link className='p-2 fontB' to="newroutin"> <Typography> روتین جدید</Typography> </Link>
                        </Button>
                    </div>
                    <div className='routin-right     ' >
                        <div className='displayStyle'><Typography className='pt-4 length-route'>روتین های من({routeTitle?.length})</Typography ></div>
                        {routeTitle?.map((item, index) =>
                            <div key={index} className='displayStyle listBox '>
                                <NavLink to={`routinesDay/${item.id}`} > <Typography className='fontB'> {item.title}</Typography></NavLink>
                                <ExampleRoutines Id={item.id} deleteRoutes={deleteRoutes} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Routines;

// block sm:hidden