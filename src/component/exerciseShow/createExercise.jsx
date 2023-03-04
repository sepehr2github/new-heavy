import React, { useState, useEffect, useCallback } from 'react'
import {
    Box, Button, Typography, Stack, Avatar,
    ListItemText, MenuItem, InputLabel, FormControl, Select, OutlinedInput, Checkbox
} from '@mui/material'

import { useDropzone } from 'react-dropzone';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Navigate } from 'react-router-dom';
import routinApi from '../axiosApi/axiosRoutin'
import { useFormik } from 'formik';
import { Label } from '@mui/icons-material';

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

const CreateExercise = () => {


    const [types, setTypes] = useState()
    const [equipments, setEquipments] = useState()
    const [muscles, setMuscles] = useState()
    const [Successfull, setSuccessfull] = useState(false)

    useEffect(() => {
        getTypes();
        getEquipments();
        getMuscles()
    }, [])

    async function getTypes() {
        routinApi.get(`/types`).then(result => { setTypes(result.data.data) }).catch(err => console.log(err))
    }

    async function getEquipments() {
        routinApi.get(`/equipments`).then(result => { setEquipments(result.data.data) }).catch(err => console.log(err))
    }

    async function getMuscles() {
        routinApi.get(`/muscles`).then(result => { setMuscles(result.data.data) }).catch(err => console.log(err))
    }

    const formik = useFormik({
        initialValues: {
            en_title: '',
            fa_title: '',
            type_id: '',
            equipment_id: '',
            primary_muscle_id: '',
            other_muscles: [],
            image: null,
            video: null
        },
        onSubmit: values => {
            console.log(values);
            routinApi.post(`/exercises`, values).then(result => console.log(result)).catch(err => console.log(err))
            setSuccessfull(true)
        }
    },
    );


    // dropzone
    const onDrop = useCallback(acceptedFiles => {
      
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


    if (Successfull) {
        //  return <Navigate to='../routines' />
    }

    return (
        <div className='fv'>
            <Box className="modalBox w-9/10 ">
                <form onSubmit={formik.handleSubmit}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        لطفا فرم را پر کنید
                    </Typography>
                    <div>
                        <div className='flex row mt-3'>
                            <Typography> تصویر ورزش </Typography>
                            <input
                                className='w-[13rem] mr-5 '
                                type='file'
                                name='image'
                                accept='image/*'
                                onChange={(e) =>
                                    formik.setFieldValue('image', e.target.files[0], e.target.value)
                                }
                            />
                        </div>
                        <div className='flex row mt-3'>
                            <Typography> گیف  ورزش </Typography>
                            <input
                                className='w-[13rem] mr-7 '

                                type='file'
                                name='video'
                                onChange={(e) =>
                                    formik.setFieldValue('video', e.target.files[0], e.target.value)
                                }
                            />
                        </div>


                        {/*
                            < div {...getRootProps()}>
                                < input {...getInputProps()} name="image" id="image" />
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
                                    */}

                    </div>
                    <hr style={{ margin: '20px 0' }}></hr>

                    <div className="listcreateExercise">
                        <input
                            id="en_title"
                            name="en_title"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.en_title}
                            placeholder=" نام انگلیسی ورزش"></input>
                        <input
                            id="fa_title"
                            name="fa_title"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.fa_title}
                            placeholder=" نام فارسی ورزش"></input>
                    </div>
                    <div className="formatSelect ">
                        <Typography>تایپ ورزش</Typography>
                        <div className="formatControler">
                            <FormControl className="formControl" >
                                <InputLabel className='mb-4'
                                    id="demo-simple-select-autowidth-label" ><Typography className='mb-5'>انتخاب کنید</Typography>
                                </InputLabel>
                                <Select
                                    id="type_id"
                                    name="type_id"
                                    onChange={formik.handleChange}
                                    value={formik.values.type_id}
                                    sx={{ height: '40px' }}
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
                    <div className="formatSelect ">
                        <Typography>لوازم ورزشی</Typography>
                        <div className="formatControler ">
                            <FormControl className="formControl " >
                                <InputLabel sx={{ lineHeight: '.7em' }}
                                    id="demo-simple-select-autowidth-label"><Typography>انتخاب کنید</Typography></InputLabel>
                                <Select
                                    sx={{ height: '40px' }}
                                    id="equipment_id"
                                    name="equipment_id"
                                    onChange={formik.handleChange}
                                    value={formik.values.equipment_id}
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
                                    id="demo-simple-select-autowidth-label"><Typography>انتخاب کنید</Typography></InputLabel>
                                <Select
                                    id="primary_muscle_id"
                                    name="primary_muscle_id"
                                    onChange={formik.handleChange}
                                    value={formik.values.primary_muscle_id}
                                    sx={{ height: '40px' }}
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
                        <div className="formatControler">
                            <FormControl className="formControl">
                                <InputLabel id="other_muscles" sx={{ lineHeight: '.7em' }}>
                                    <Typography>انتخاب کنید</Typography>
                                </InputLabel>
                                <Select
                                    sx={{ height: '40px' }}
                                    labelId="demo-multiple-checkbox-label"
                                    multiple
                                    id="other_muscles"
                                    name="other_muscles"
                                    onChange={formik.handleChange}
                                    value={formik.values.other_muscles}
                                    input={<OutlinedInput label="Tag" />}
                                    MenuProps={MenuProps}
                                    renderValue={(selected) => selected.join(', ')}
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
                            <hr style={{ margin: '20px 0' }}></hr>
                        </div>

                    </div>
                    <div  >
                        <Button className="inputSend" color="primary"
                            variant="contained" type="submit" > <Typography >ارسال</Typography></Button>

                    </div>
                </form>
            </Box >
        </div >


    )
}

export default CreateExercise
