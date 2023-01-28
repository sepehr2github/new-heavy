import React, { useState } from "react";
import Navbar from '../layout/navbar'
import { Box, Paper, Input, Button } from '@mui/material'

const CheckNumber = ()=> {

    const [name, setName] = useState()
    const handleName = (e) => {
        setName(e.target.value)
    }
    const [number, setNumber] = useState()
    const handleNumber = (e) => {
        setNumber(e.target.value)
    }
    const [form, setForm] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        setForm(true) }
    const [check , setCheck] = useState()
    const handleCheckInput = (e)=>{       
        setCheck(e.target.value)  }
    const  handleCheck = ()=> { }

    return (
        <div>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',

                    marginTop: 7,
                    '& > :not(style)': {
                        m: 1,
                        width: 560,
                        height: 360,
                    },
                }}
            >
                <Paper elevation={9} className="paperLogin" >
                    <h1 className="m-10 titleLogin">WECOME TO HEVY</h1>

                    {form==false ? 
                    <form className="inputLogins" onSubmit={handleSubmit}>
                        <label for='names'> name : </label>
                        <Input id='names' type="name" className=" inputLogin "
                            value={name} onChange={handleName} />
                        <label for='numbers'> number : </label>
                        <Input id='numbers' type="number" className=" inputLogin my-4"
                            value={number} onChange={handleNumber} />
                        <Button className="inputLogin" color="primary" variant="contained" type="submit" > Log IN</Button>
                    </form>
                        :
                        <form className="inputLogins" onSubmit={handleCheck}>
                            <label for='checks'>  Please enter the password sent </label>
                            <Input id='checks' type="number" className=" inputLogin my-4" onChange={handleCheckInput} value={check} />
                            <Button className="inputLogin " color="primary" variant="contained" onClick={handleCheck} > checked</Button>
                        </form>
                    }

                </Paper>

            </Box >
        </div>
    );
}

export default CheckNumber;