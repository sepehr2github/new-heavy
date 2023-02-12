import React, { useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import App from '../../App'
import Routines from './routines'
import { deleteExercise ,createSuperSet} from '../../store/slice/exerciseSlice'
import { updateDeleteExercise, addReplace , updatecreateSuperSet} from '../../store/slice/routinesdaySlice'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Modal, Box } from '@mui/material'
import MenuExercise from './menuExercise'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ExampleCard({ Id , seperator, getReplace ,getSuperSet,getSuperSetId }) {
    const dispatch = useDispatch()
    // const [replace , setReplace] = useState(false)

    const handleDelete = () => {
        if (seperator == 1) { dispatch(deleteExercise(Id)) }
        if (seperator == 2) { dispatch(updateDeleteExercise(Id)) }
    }

    const handleReplace = () => {
        getReplace(true)
        if (seperator == 1) { dispatch(deleteExercise(Id)) }
        if (seperator == 2) { dispatch(updateDeleteExercise(Id)) }
    }

    const handleSuperSet = () => {
        dispatch(createSuperSet(Id))  
        getSuperSet(true)
        getSuperSetId(Id)
    }

    return (
        <>
            <Menu as="div" className="ml-1 inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center bg-white px-2 py-2 
        text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1
         focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-gray-100">
                        <MoreVertIcon />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="example absolute  z-10   origin-top-right  rounded-md bg-white shadow-lg ring-1
                ring-black ring-opacity-5 focus:outline-none  ">
                        <div className="  w-1 ">
                            <ul>
                                <li>  <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={handleDelete}
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                ' pl-8 pr-2 pt-3  text-sm border-black border-b-2 '
                                            )}
                                        >
                                            <div className='flex  '><Typography>  حذف </Typography> </div>
                                        </button>
                                    )}
                                </Menu.Item></li>

                                <li>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleReplace}
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    ' pl-8 pt-3  pr-1 text-sm'
                                                )}
                                            >
                                                <div className='flex  '><Typography>  جایگزینی </Typography>  </div>
                                            </button>
                                        )}
                                    </Menu.Item>
                                </li>

                                <li>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleSuperSet}
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    ' pl-8 pt-3  pr-1 text-sm'
                                                )}
                                            >
                                                <div className='flex  '><Typography> سوپر ست </Typography>  </div>
                                            </button>
                                        )}
                                    </Menu.Item>
                                </li>
                            </ul>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
