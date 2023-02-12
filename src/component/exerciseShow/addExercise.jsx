import React, { useState, useEffect } from 'react'
import {
    Paper, Box, Hidden, Button, Modal, Typography, ListItemAvatar, Stack, TextField, Avatar,
    ListItemText, List, ListItem, MenuItem, InputLabel, FormControl, Select, OutlinedInput
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import routinApi from '../axiosApi/axiosRoutin'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const AddExercise = () => {

    const [faTitle, setFaTitle] = useState(null)
    const [enTitle, setEnTitle] = useState(null)
    const [types, setTypes] = useState()
    const [type, setType] = useState(null)
    const [equipments, setEquipments] = useState()
    const [equipment, setEquipment] = useState(null)
    const [muscles, setMuscles] = useState()
    const [primaryMuscle, setPrimaryMuscle] = useState(null)
    const [otherMuscles, setOtherMuscles] = useState([])
    const [Successfull, setSuccessfull] = useState(false)

    const dispatch = useDispatch()
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: {
            'image/jpeg': ['.jpeg', '.png']
        }
    });

    useEffect(() => {
        getTypes();
        getEquipments();
        getMuscles()
    }, [])

    async function getTypes() {
        routinApi.get(`/types`).then(result=> {
            setTypes(result.data.data)
        }).catch(err => console.log(err))
    }

    async function getEquipments() {
        routinApi.get(`/equipments`).then(result=> {
            setEquipments(result.data.data).catch(err => console.log(err))

        })}

    async function getMuscles() {
        routinApi.get(`/muscles`).then(result => {
            setMuscles(result.data.data).catch(err => console.log(err))
        })}


    const [exercise, setExercise] = useState({
        'en_title': '',
        'fa_title': '',
        'type_id': '',
        'equipment_id': '',
        'primary_muscle_id': '',
        'other_muscles': []
    })

    const handleType = (e) => {
        setType(e.target.value)
        setExercise(previousState => { return { ...previousState, type_id: e.target.value } })
    }
    const handleFaTitle = (e) => {
        setFaTitle(e.target.value)
        setExercise(previousState => { return { ...previousState, fa_title: e.target.value } })
    }
    const handleEnTitle = (e) => {
        setEnTitle(e.target.value)
        setExercise(previousState => { return { ...previousState, en_title: e.target.value } })
    }
    const handleEquipments = (e) => {
        setEquipment(e.target.value)
        setExercise(previousState => { return { ...previousState, equipment_id: e.target.value } })
    }
    const handlePrimaryMuscle = (e) => {
        setPrimaryMuscle(e.target.value)
        setExercise(previousState => { return { ...previousState, primary_muscle_id: e.target.value } })
    }
    const handleOtherMuscles = (e) => {
        setOtherMuscles(  e.target.value  )
        setExercise(previousState => { return { ...previousState, other_muscles : e.target.value } })
    }


     function handleSubmit() {
        routinApi.post(`/exercises`,exercise).then(result=> console.log(result)).catch(err => console.log(err))
         setSuccessfull(true)
    }



    if (Successfull) {
        return    <Navigate to='../routines' />
    }

    return (
        <div className='fv'>
            <Box className="modalBox w-9/10 ">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    لطفا فرم را پر کنید
                </Typography>
                <div className="container">
                    <div {...getRootProps({ className: 'dropzone , pointer' })} >
                        <input {...getInputProps()} />
                        {!isDragActive && (
                            <>
                                <Stack direction="row" spacing={2}>
                                    <Avatar sx={{
                                        width: '80px', height: '80px', border: 'solid 2px rgb(224, 224, 224)',
                                        backgroundColor: '#fff'
                                    }}>
                                        <CameraAltIcon sx={{ fontSize: '2rem', color: '#000' }} />
                                    </Avatar>
                                </Stack>
                                <h3>Add Image</h3>
                            </>
                        )}
                    </div>
                </div>
                <div className="listcreateExercise">
                    <input value={enTitle} onChange={handleEnTitle} type="text" id="lname" name="lname" placeholder=" نام انگلیسی ورزش"></input>
                    <input value={faTitle} onChange={handleFaTitle} type="text" id="lname" name="lname" placeholder=" نام فارسی ورزش"></input>
                </div>
                <div className="formatSelect ">
                    <Typography>تایپ ورزش</Typography>
                    <div className="formatControler">
                        <FormControl className="formControl" >
                            <InputLabel sx={{ lineHeight: '.7em' }} className='addExercise'
                                id="demo-simple-select-autowidth-label" ><Typography>انتخاب کید</Typography></InputLabel>
                            <Select
                                sx={{ height: '40px' }}
                                id="demo-simple-select-autowidth"
                                value={type}
                                onChange={handleType}
                                autoWidth
                                label="Select"
                                className="h-18 form-select appearance-none block w-full px-3 py-3 text-base font-normal
                                text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid
                                 border-gray-300  rounded transition ease-in-out m-0 focus:text-gray-700
                                 focus:bg-white focus:border-blue-600 focus:outline-none "
                            >
                                <MenuItem value="0" sx={{ width: '290px' }}>
                                    <em>None</em>
                                </MenuItem>
                                {types?.map((types) => <MenuItem value={types.id}><Typography className=''>{types.title}</Typography></MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <hr style={{ margin: '20px 0' }}></hr>
                <div className="formatSelect menuFilter">
                    <Typography>لوازم ورزشی</Typography>
                    <div className="formatControler ">
                        <FormControl className="formControl " >
                            <InputLabel sx={{ lineHeight: '.7em' }}
                                id="demo-simple-select-autowidth-label"><Typography>انتخاب کید</Typography></InputLabel>
                            <Select
                                sx={{ height: '40px' }}
                                id="demo-simple-select-autowidth"
                                value={equipment}
                                onChange={handleEquipments}
                                autoWidth
                                label="Select"
                                className="h-18 form-select appearance-none block w-full px-3 py-3 text-base font-normal
                                text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid
                                 border-gray-300  rounded transition ease-in-out m-0 focus:text-gray-700
                                 focus:bg-white focus:border-blue-600 focus:outline-none "
                            >
                                <MenuItem value="0" sx={{ width: '190px' }}>
                                    <em>None</em>
                                </MenuItem>
                                {equipments?.map((equipments) => <MenuItem className='dir:rtl' value={equipments.id}><Typography>{equipments.title}</Typography></MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <hr style={{ margin: '20px 0' }}></hr>
                <div className="formatSelect">
                    <Typography> مهمترین عضله</Typography>
                    <div className="formatControler">
                        <FormControl className="formControl" >
                            <InputLabel sx={{ lineHeight: '.7em' }}
                                id="demo-simple-select-autowidth-label"><Typography>انتخاب کید</Typography></InputLabel>
                            <Select
                                sx={{ height: '40px' }}
                                id="demo-simple-select-autowidth"
                                value={primaryMuscle}
                                onChange={handlePrimaryMuscle}
                                autoWidth
                                label="Select"
                                className="h-18 form-select appearance-none block w-full px-3 py-3 text-base font-normal
                                text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid
                                 border-gray-300  rounded transition ease-in-out m-0 focus:text-gray-700
                                 focus:bg-white focus:border-blue-600 focus:outline-none "
                            >
                                <MenuItem value="0" sx={{ width: '190px' }}>
                                    <em>None</em>
                                </MenuItem>
                                {muscles?.map((muscle) => <MenuItem value={muscle.id}><Typography>{muscle.title}</Typography></MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <hr style={{ margin: '20px 0' }}></hr>
                <div className="formatSelect">
                    <Typography>دیگر عضلات</Typography>
                    <div>
                        <FormControl sx={{ m: 1 ,width: '200px'}}>
                            <InputLabel id="demo-multiple-checkbox-label" sx={{ lineHeight: '.7em' }}><Typography>انتخاب کید</Typography></InputLabel>
                            <Select
                                sx={{ height: '60px' }}
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={otherMuscles}
                                onChange={handleOtherMuscles}
                                input={<OutlinedInput label="Tag" />}
                                MenuProps={MenuProps}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                className="h-18 form-select appearance-none block w-full px-3 py-3 text-base font-normal
                                text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid
                                 border-gray-300  rounded transition ease-in-out m-0 focus:text-gray-700
                                 focus:bg-white focus:border-blue-600 focus:outline-none "
                            >
                                <MenuItem value="0" sx={{ width: '230px' }}>
                                    <em>None</em>
                                    </MenuItem>
                                    {muscles?.map((muscles) => (
                                        <MenuItem key={muscles.id} value={muscles.id}>
                                            <Checkbox />
                                            <ListItemText primary={muscles.title} />
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </div>

                </div>
                <div  >
                    <Button onClick={handleSubmit} className="inputSend" color="primary"
                        variant="contained" type="submit" > <Typography >ارسال</Typography></Button>

                </div>
            </Box>
        </div>


    )
}

export default AddExercise
