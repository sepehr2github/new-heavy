import React, { useState } from "react";
import { Grid, Box, ListItem, List, InputBase, Typography } from '@mui/material'
import Navbar from './navbar'
import { Label } from "@mui/icons-material";
import { FormControl, Input, InputLabel } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const Settings = () => {


    const [profile, setProfile] = useState(true)

    const handleProfile = () => {
        setProfile(true)
        setAccount(false)
    }
    const [account, setAccount] = useState(false)

    const handleAccount = () => {
        setProfile(false)
        setAccount(true)
    }
    const [img, setImg] = useState()

    const handleImg = (e) => {
        setImg(e.target.value)
    }

    const [name, setName] = useState()

    const handleName = (e) => {
        setName(e.target.value)
    }

    const [bio, setBio] = useState()
    const handleBio = (e) => {
        setBio(e.target.value)
    }


    return (
        <div className='exercise.style'>
            <Navbar />
            <div container className='setting-box lg:flex sm:w-full'>
                    <div item  className=' md:flex lg:flex sm:w-full justify-end '>
                        <List className="listSetting" sx={{ width: '100%' ,width:'24rem' ,bgcolor: 'background.paper', marginTop: '.5rem', minHeight: 500, overflow: 'auto', }}>
                            <Typography className=" titleSetting">اکانت</Typography>
                            <a onClick={handleProfile} > <ListItem ><div className="listItemSetting "> <Typography>پروفایل</Typography> </div> <ArrowBackIosNewIcon /> </ListItem></a>
                            <a onClick={handleAccount} > <ListItem ><div className="listItemSetting "><Typography>اکانت</Typography> </div><ArrowBackIosNewIcon /></ListItem></a>
                            <a> <ListItem ><div className="listItemSetting "><Typography>مدیریت اشتراک </Typography> <samp samp>PRO </samp></div><ArrowBackIosNewIcon /></ListItem></a>
                        </List>
                    </div>
                    <div   className='setting-Right md:flex lg:flex sm:w-full max-md:w-full lg:w-full sm:inline'>

                        {profile ? < >
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m:2, mt: 3 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <div className="uploadpicture">
                                    <label for="file-upload" className=""  > <AccountCircleIcon sx={{ fontSize: 140 }} color="disabled" /> </label>
                                    <label for="file-upload"  >
                                        <Input id="file-upload" type="file" className=" mt-8" style={{ display: 'none' }}
                                            value={img} onChange={handleImg}
                                        />
                                       <Typography> آپلود تصویر</Typography>
                                    </label >
                                </div>
                                <Input placeholder="نام کاربری" id="name-id" type="text" className=" inputSetting"
                                    value={name} onChange={handleName}
                                />
                                <Input placeholder="بیو" type="text" id="bio-id" className="inputSetting"
                                    value={bio} onChange={handleBio}
                                />
                            </Box>
                        </>
                            : account ? <div>
                                <Typography>حریم خصوصی</Typography>
                                <br />
                                <Typography className="">داشتن یک نمایه خصوصی به این معنی است که سایر کاربران باید درخواست کنند تا شما را دنبال کنند. فقط اگر درخواست فالو آنها را بپذیرید، می توانند تمرینات شما را ببینند</Typography>
                                <Box
                                className=" passwordSetting mt-20"
                                    component="form"
                                    sx={{
                                        '& > :not(style)': {mt:1 },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <label for="CurrentPassword"><Typography>کلمه عبور قبلی</Typography></label>
                                    <Input id="CurrentPassword"   type="text" 
                                        // value={CurrentPassword} onChange={handleCurrentPassword}
                                    />
                                    <label for="NewPassword"><Typography>کلمه عبور جدید</Typography></label>
                                    <Input id="NewPassword"  type="text"  
                                        // value={newPassword} onChange={handleNewPassword}
                                    />
                                </Box>

                            </div>
                                : ''}
                    </div>
                </div>
        </div>
    );
}

export default Settings;