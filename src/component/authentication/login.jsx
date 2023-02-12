import React, { useState } from 'react'
import { Box, Input, Button, Typography, Paper } from '@mui/material'
import App from '../../App'
import logo from "../../logo.png";
import routinApi from '../axiosApi/axiosRoutin'
import { Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom';

const Login = () => {

    const [login, setLogin] = useState(false)
    const [phone, setTel] = useState("")
    const [password, setPass] = useState("")
    const handleTel = (e) => {
        setTel(e.target.value)
    }

    const handlepass = (e) => {
        setPass(e.target.value)
    }

    const initialValues = {
        mobile: '',
        password: ''
    }

    function handleSubmit(values) {
        console.log(values, )

        routinApi.post(`/pass-login`, values).then(result => {
            (!result.data.token) ?
                console.log(result)
                :
                localStorage.setItem("token", result.data.token)
            localStorage.setItem("name", result.data.user.name)
            setLogin(true)
        })
    }

    if (login) {
        return <App />
    }


    return (
        <div className='login'>
            <div className="min-h-full flex flex-col justify-center py-12  sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">ورود به سایت</h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values) => {
                                handleSubmit(values)
                            }}>
                            <Form className="space-y-6">
                                <div>
                                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                                    mobile 
                                    </label>
                                    <div className="mt-1">
                                        <Field id="mobile" name="mobile" type="number" autoComplete="mobile" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <Field id="password" name="password" type="password" autoComplete="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>
                               <div className='mt-2'> <Link  to='/register '> قبلا ثبت نام نکرده اید</Link></div> 
                                <div>
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        ورود
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login


