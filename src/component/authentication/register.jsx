import React from "react";
import { Field, Form, Formik } from 'formik'
import routinApi from '../axiosApi/axiosRoutin'
import { useState } from "react";
import { Navigate } from "react-router-dom";
function Register() {

    const [Successfull , setSuccessfull] = useState(false)

    const initialValues = {
        name: '',
        mobile: '',
        password: '',
        gender: ''
    }


    const handleSubmit = (value) => {
        routinApi.post(`/register`, value).then(res => setSuccessfull(true)).catch(err => console.log(err))
        
    }
    if (Successfull) { return <Navigate to='./login' /> }

    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">ثبت نام در</h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(value) => handleSubmit(value)} >
                            <Form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <div className="mt-1">
                                        <Field id="name" name="name" type="text" autoComplete="name" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                                        phone address
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
                                <div >
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                        gender
                                    </label>
                                    <div className="mt-1 ml-3">
                                    <label className="text-gray-500  font-bold">
                                        <Field
                                            name="gender"
                                            value="male"
                                            className="mr-2 leading-tight"
                                            type="radio"
                                        />
                                        <span class="text-sm">مرد</span>
                                    </label>
                                    </div>
                                    <div className="mt-1 ml-3">
                                    <label className="text-gray-500 font-bold">
                                        <Field
                                            name="gender"
                                            value="female"
                                            className="mr-2 leading-tight"
                                            type="radio"
                                        />
                                        <span class="text-sm">زن</span>
                                    </label>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Register
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;