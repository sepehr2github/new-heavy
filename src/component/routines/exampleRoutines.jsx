import React, { useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { NavLink } from 'react-router-dom'
import { Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function ExampleRoutines(Props) {


  return (
    <Menu as="div"  className="relative  inline-block text-left ">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-100 bg-white px-2  py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <Typography className='hidden sm:flex'> بیشتر</Typography>
          <MoreVertIcon className='sm:hidden'/>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-38 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to={`editeRoutin/${Props.Id}`}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <Typography className='exampleMenu'> ویرایش</Typography>
                </NavLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => Props.deleteRoutes(Props.Id)}
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <Typography> حذف</Typography>

                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
