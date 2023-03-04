import React from 'react'
import Navbar from '../layout/navbar'
import CardRoutineDay from './cardRoutineDay';

const RoutinesDay = () => {

    return (
        <div className='routin-style'>
            <Navbar />
            <div className='button-update'>
            </div>
            <div className=' md:flex routine-day' >
                <CardRoutineDay />
            </div>
        </div>
    )
}

export default RoutinesDay
