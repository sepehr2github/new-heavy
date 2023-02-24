import React, { useState, useEffect, useCallback } from 'react'
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
import { margin } from '@mui/system';
import { Field, Form, Formik  } from 'formik'
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

const AddNewExercise = () => {

    const [types, setTypes] = useState()
    const [equipments, setEquipments] = useState()
    const [muscles, setMuscles] = useState()
    const [imageExercise , setImageExercise] = useState()
    const [Successfull, setSuccessfull] = useState(false)
    const dispatch = useDispatch()
 
    const onDrop = useCallback(acceptedFiles => {
        setImageExercise(acceptedFiles[0])
    }, [])

    useEffect(() => {
        getTypes();
        getEquipments();
        getMuscles()
    }, [])

    async function getTypes() {
        routinApi.get(`/types`).then(result => {
            setTypes(result.data.data)
        }).catch(err => console.log(err))
    }

    async function getEquipments() {
        routinApi.get(`/equipments`).then(result => {
            setEquipments(result.data.data).catch(err => console.log(err))

        })
    }

    async function getMuscles() {
        routinApi.get(`/muscles`).then(result => {
            setMuscles(result.data.data).catch(err => console.log(err))
        })
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const initialValues = {
        en_title: '',
        fa_title: '',
        type_id: '',
        equipment_id: '',
        primary_muscle_id: '',
        other_muscles: [1],
        image: imageExercise,
        video: null
    }


   
   
   

    console.log(imageExercise);
    function handleSubmit(values) {

       console.log(values.image);
       

        // routinApi.post(`/exercises`, values).then(result => console.log(result)).catch(err => console.log(err))
        setSuccessfull(true)
    }


    if (Successfull) {
        return <Navigate to='../routines' />
    }
    return (
        <div className='fv'>
            <Box className="modalBox w-9/10 ">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    لطفا فرم را پر کنید
                </Typography>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}>
                    <Form className="space-y-6">
                        <div className='mt-5'>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} name="image" id="image" />
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
                            </div>

                            <hr style={{ margin: '20px 0' }}></hr>
                        </div>
                        <div className="listcreateExercise">
                            <Field name="en_title" id="en_title" type="text" placeholder=" نام انگلیسی ورزش"></Field>
                            <Field name="fa_title" id="fa_title" type="text" placeholder=" نام فارسی ورزش"></Field>
                        </div>
                        <div className="formatSelect ">
                            <Typography>تایپ ورزش</Typography>
                            <div className="formatControler">
                                <FormControl className="formControl" >
                                    <InputLabel className='mb-4'
                                        id="type_id" >
                                    </InputLabel>
                                    <Field
                                        sx={{ height: '40px' }}
                                        id="type_id"
                                        name="type_id"
                                        as="select"
                                        autoWidth
                                        label="Select"
                                        className="h-18 form-select appearance-none block w-full px-3 py-3 text-base font-normal
                                text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid
                                 border-gray-300  rounded transition ease-in-out m-0 focus:text-gray-700
                                 focus:bg-white focus:border-blue-600 focus:outline-none "
                                    >
                                        <option value="0" sx={{ width: '290px' }}>
                                            <Typography>انتخاب کنید</Typography>
                                        </option>
                                        {types?.map((types) => <option value={types.id}><Typography className=''>{types.title}</Typography></option>)}
                                    </Field>
                                </FormControl>
                            </div>
                        </div>
                        <hr style={{ margin: '20px 0' }}></hr>
                        <div className="formatSelect ">
                            <Typography>لوازم ورزشی</Typography>
                            <div className="formatControler ">
                                <FormControl className="formControl " >
                                    <InputLabel sx={{ lineHeight: '.7em' }}
                                        id="equipment_id"></InputLabel>
                                    <Field
                                        sx={{ height: '40px' }}
                                        name="equipment_id"
                                        as="select"
                                        id="equipment_id"
                                        autoWidth
                                        label="Select"
                                        className="h-18 form-select appearance-none block w-full px-3 py-3 text-base font-normal
                                text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid
                                 border-gray-300  rounded transition ease-in-out m-0 focus:text-gray-700
                                 focus:bg-white focus:border-blue-600 focus:outline-none "
                                    >
                                        <option value="0" sx={{ width: '190px' }}>
                                            <Typography>انتخاب کنید</Typography>
                                        </option>
                                        {equipments?.map((equipments) => <option className='dir:rtl' value={equipments.id}><Typography>{equipments.title}</Typography></option>)}
                                    </Field>
                                </FormControl>
                            </div>
                        </div>
                        <hr style={{ margin: '20px 0' }}></hr>
                        <div className="formatSelect">
                            <Typography> مهمترین عضله</Typography>
                            <div className="formatControler">
                                <FormControl className="formControl" >
                                    <InputLabel sx={{ lineHeight: '.7em' }}
                                        id="primary_muscle_id"></InputLabel>
                                    <Field
                                        sx={{ height: '40px' }}
                                        id="primary_muscle_id"
                                        name="primary_muscle_id"
                                        as="select"
                                        autoWidth
                                        label="Select"
                                        className="h-18 form-select appearance-none block w-full px-3 py-3 text-base font-normal
                                text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid
                                 border-gray-300  rounded transition ease-in-out m-0 focus:text-gray-700
                                 focus:bg-white focus:border-blue-600 focus:outline-none "
                                    >
                                        <option value="0" sx={{ width: '190px' }}>
                                            <Typography>انتخاب کنید</Typography>
                                        </option>
                                        {muscles?.map((muscle) => <option value={muscle.id}><Typography>{muscle.title}</Typography></option>)}
                                    </Field>
                                </FormControl>
                            </div>
                        </div>
                        <hr style={{ margin: '20px 0' }}></hr>

    


                        <hr style={{ margin: '20px 0' }}></hr>
                        <div  >
                            <Button type="submit" className="inputSend" color="primary"
                                variant="contained"  > <Typography >ارسال</Typography></Button>

                        </div>
                    </Form>
                </Formik>
            </Box >
        </div >


    )
}

export default AddNewExercise
