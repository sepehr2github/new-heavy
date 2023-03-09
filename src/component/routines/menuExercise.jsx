import React, { useState, useEffect } from 'react'
import { List, ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Box, Paper, InputBase, IconButton, Modal, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import CreateExercise from '../exerciseShow/createExercise'

import { setExercise } from '../../store/slice/exerciseSlice'
import { updateAddExercise } from '../../store/slice/routinesdaySlice'
import { exerciseShow } from '../../store/slice/exerciseShow'
import fit2 from '../../img/fit2.jpg'
import routinApi from '../axiosApi/axiosRoutin'
import CustomizedSnackbars from '../snakbar/alert';
import axios from 'axios';
import useSWR from 'swr';
import {addExericse , addMuscles ,addEquipments} from '../../store/slice/listExercise'

const MenuExercise = ({ separator }) => {

    const list = useSelector(state => state.listExercise.list)

    const dispatch = useDispatch()
    // api
 
    axios.defaults.headers.get['Authorization'] = `Bearer ${localStorage.getItem("token")}`
   
   const { rout } = useSWR(["https://api.ddem.ir/api/v1"], getExercise)

    function getExercise(url) {
        axios.get(`${url}/exercises`).then(res => dispatch(addExericse(res.data.data))).catch(err => console.log(err))
        axios.get(`${url}/equipments`).then(res => dispatch(addEquipments(res.data.data))).catch(err => console.log(err))
        axios.get(`${url}/muscles`).then(res => dispatch(addMuscles(res.data.data))).catch(err => console.log(err))
    }



    const [openCreateList, setOpenCreateList] = useState(false)
    const handleOpenCreate = () => setOpenCreateList(true)
    const handleCloseCreate = () => setOpenCreateList(false) 

    // add exercise

    const handleList = (Id) => {
        const chosen = list.exercises.find((item) => item.id == Id)
        if (separator == 1) { dispatch(setExercise({ chosen })) }
        if (separator == 2) { dispatch(updateAddExercise({ chosen })) }
        if (separator == 3) { dispatch(exerciseShow({ chosen })) }

    }

    // search 

    const [filterEquipment, setFilterEquipment] = useState(0)
    const [filterMuscles, setFilterMuscles] = useState(0)
    const [search, setSearch] = useState('')
    const handleFilterEquipment = (e) => {
        setFilterEquipment(e.target.value)
        setSearch('')
    }

    const handleFilterMuscles = (e) => {
        setFilterMuscles(e.target.value)
        setSearch('')
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const Filtered = filterEquipment == 0 ?
    list.exercises :
    list.exercises.filter((option) =>
            option.equipment_id == filterEquipment
            // option.equipment.title.toLowerCase().includes(filterEquipment.toLowerCase())
        );


    const filtered = filterMuscles == 0 ?
        Filtered :
        Filtered.filter((option) =>
            option.primary_muscle_id == filterMuscles
        );


    const searched = !search ?
        filtered :
        list.exercises.filter((option) =>
            option.fa_title.toLowerCase().includes(search.toLowerCase()) ||
            option.en_title.toLowerCase().includes(search.toLowerCase()))


            const [successfullcreateExercise , setSuccessfullcreateExercise]=useState(false)
      
       
       const successfull = ()=> {
        setSuccessfullcreateExercise(true)
       }
    return (
        <div >
            <Box component="form" container
                sx={{ '& .MuiTextField-root': { marginTop: '.5rem ', width: '100%' }, }}
                noValidate autoComplete="off">
                {/* <Typography>فیلتر :</Typography> */}
                <div className="flex justify-center menuFilter" >
                    <div className="mb-3 w-96 dir-rtl  ">
                        <Typography >
                            <select
                                value={filterEquipment}
                                onChange={handleFilterEquipment}
                                className="h-18 form-select appearance-none block w-full px-3 py-3 text-base font-normal
                               text-gray-700  bg-white bg-clip-padding bg-no-repeat
                               border border-solid border-gray-300 rounded transition ease-in-out m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example">
                                <option key='0' value='0'> <Typography className="fv">لوازم ورزشی</Typography></option>
                                {list.equipments?.map((item ,index) => <option className="fv" key={item.id} value={item.id}>
                                    <h1>{item.title}</h1></option>)}
                            </select>
                        </Typography>
                    </div>
                </div>
                <div className="flex justify-center ">
                    <div className="mb-3 w-96 ">
                        <Typography>
                            <select
                                value={filterMuscles}
                                onChange={handleFilterMuscles}
                                className="h-18 form-select appearance-none block w-full px-3 py-3 text-base font-normal
                                          text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid
                                           border-gray-300  rounded transition ease-in-out m-0 focus:text-gray-700
                                           focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example">
                                <option key='0' value='0'> <h1 >عضلات</h1></option>
                                {list.musclses?.map((item) => <option key={item.id} value={item.id}><h1>{item.title}</h1></option>)}
                            </select>
                        </Typography>
                    </div>
                </div>
            </Box>
            <button onClick={handleOpenCreate}
                color="primary" variant="contained" ><Typography> ایجاد ورزش جدید +</Typography>
            </button>
            <Modal
                open={openCreateList}
                onClose={handleCloseCreate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
               <><CreateExercise successfull={successfull} handleCloseCreate={handleCloseCreate}/></> 
            </Modal>
            <div className=''>
                <Paper
                    component="form"
                    sx={{
                        p: '2px 4px', display: 'flex', alignitems: 'center',
                        backgroundColor: 'rgb(240, 240, 240);'
                    }}
                >
                    <IconButton type="submit" sx={{ p: '5px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="جستجوی ورزش"
                        inputProps={{ 'aria-label': 'search exercise' }}
                        onChange={handleSearch}
                        value={search}
                    />
                </Paper>
            </div>
            <div>
                <List sx={{
                    direction: 'rtl', width: '100%', marginTop: 5,
                    bgcolor: 'background.paper', maxHeight: 360, maxWidth: 360, position: 'relative', overflow: 'auto',
                }}>
                    {searched?.map((option, index) =>
                        <button
                        key={index}
                            onClick={() => handleList(option.id)}
                            className="list-button hover:bg-gray-100">
                            <ListItem alignItems="flex-start  "  key={index}>
                                <ListItemAvatar className='mb-2'>
                                    <Avatar alt="Remy Sharp" sx={{ width: 50, height: 50 }} src={fit2} />
                                </ListItemAvatar>
                                <ListItemText
                                    className='mr-5 pt-1'
                                    alignItems="flex-start"
                                    primary={
                                        <Typography>
                                            {option.fa_title}
                                        </Typography>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            {option.primary_muscle.title}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </button>
                    )}
                </List>
            </div>
            {successfullcreateExercise? <CustomizedSnackbars variant={'success'} text={'ورزش جدید با موفقیت ساخته شد'} /> :''}
        </div>
    )
}

export default MenuExercise
