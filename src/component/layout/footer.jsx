import { Typography } from '@mui/material';
import React from 'react'
import logo from "../../logo.png";
import logors from "../../logors.png";



const Footer = () => {
    return (
        <div className='sm:mb-0 flex  footer-style '>
            <footer className="p-4  shadow md:px-6 md:py-8 w-full footer ">
                <div className="flex items-center justify-between ">
                    <a to="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
                        <div className="navLogo">
                            <a  to='/'><img className='hidden sm:flex' src={logo} width="110" height="26" /></a>
                            <a  to='/'><img className='flex sm:hidden ' src={logors} width="35  " height="35" /></a>
                        </div>
                    </a>
                    <ul className="flex  flex-nowrap flex-row items-center mb-6  text-gray-800 sm:mb-0 dark:text-gray-600 ">
                        <li className='mx-2 '>
                            <a  href="#" className=" hover:underline "><p className='text-xs md:text-lg'> درباره ی ما </p></a>
                        </li>
                        <li className='mx-2'>
                            <a  href="#" className=" hover:underline text-9xl "><p className='text-xs md:text-lg'> حریم خصوصی</p></a>
                        </li>
                        <li className='mx-2'>
                            <a  href="#" className=" hover:underline "><p className='text-xs md:text-lg'>مجوز</p></a>
                        </li>
                        <li className='mx-2'>
                            <a  href="#" className=" hover:underline "><p className='text-xs md:text-lg' > ارتباط با ما</p></a>
                        </li>
                    </ul>

                </div>
                <hr className=" mt-4 border-gray-200 mx-auto dark:border-gray-700 " />
                <span className=" mb-10  md:mb-5  block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 
                <a  to="http://younikweb.ir" className  ="hover:underline">younikweb™</a>. All Rights Reserved.
                </span>
            </footer>
        </div>
    )
}

export default Footer
