import React, { useState, useRef, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faClock } from '@fortawesome/free-regular-svg-icons'
// 
import '../../App.css';
import { useDispatch } from 'react-redux';
import { addTimer } from '../../store/slice/history';
// const element = <FontAwesomeIcon icon={faClock} />

const TimerRoutin = ({ start  }) => {
    const [timer, setTimer] = useState(0)
    const increment = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {

        
        if (start == true  ) {
            increment.current = setInterval(() => {
                setTimer((timer) => timer + 1)
            }, 1000)
        } else  {
            clearInterval(increment.current)
            if (timer > 5 ) dispatch(addTimer({timer}))
        }

    }, [start])



    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

        return  `  ${getSeconds}: ${getMinutes} : ${getHours}`
    }

    return (
        <div className="Stopwatch">
            <h3>زمان شروع روتین </h3>
            <div className='stopwatch-card'>
                <p>{formatTime()}</p>

            </div>
        </div>
    );
}

export default TimerRoutin;