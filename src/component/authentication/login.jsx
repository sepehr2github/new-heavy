import React, { useState } from 'react'
import { Box, Input, Button, Typography, Paper } from '@mui/material'
import Navbar from '../layout/navbar'
import App from '../../App'
import logo from "../../logo.png";
import routinApi from '../axiosApi/axiosRoutin'
import Loginbg3 from '../../img/Loginbg3.jpg'
const Login = () => {

    // const email = useRef()
    // const password = useRef()
    const [login, setLogin] = useState(false)
    const [mobile, setTel] = useState("")
    const [password, setPass] = useState("")
    const handleTel = (e) => {
        setTel(e.target.value)
    }

    const handlepass = (e) => {
        setPass(e.target.value)
    }


     function handleSubmit() {
        console.warn(mobile, password)
        let item = { mobile, password };

        routinApi.post(`/pass-login`,item).then(result => {
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
        <div className='login flex justify-center items-center mt '>
            <Box
                className='rounded-lg boxLogin mx-2 -mt-10   '
                sx={{
                    width: 530,
                    height: 300,

                }}
            >
                <div div className="inputLogins my-5 " >
               <div className='mb-10'><a href='/'><img className='' src={logo} width="110" height="26" /></a></div> 
                <div className='-mt-3 mb-7 titleLogin '> <Typography > نام کاربری و کلمه عبور خود را وارد کنید</Typography></div>
                    <Input id='emails' type="phone" className=" inputLogin my-4 rounded h-auto" onChange={handleTel} value={mobile} placeholder='شماره خود را وارد کنید     ' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                    <Input id='password' type="password" className=" inputLogin my-4 rounded h-auto" onChange={handlepass} value={password} placeholder= "کلمه عبور" />
                 <Button onClick={handleSubmit} variant='contained' className="buttonLogin " > 
                <Typography className=''>ورود</Typography> </Button> 
                </div >
            </Box>


        </div>

    )
}

export default Login


