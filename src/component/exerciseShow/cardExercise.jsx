import React from 'react'
import { useSelector } from 'react-redux'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import Fit1 from '../../video/Fit1.mp4'
// import Fit1 from '../../video/Fit1.mp4'




const CardExercise = () => {

  const list = useSelector(state => state.exerciseShow.list)

console.log(list);
  return (

    <div>
      < div className='my-4 flex' >
        <> 
          {/* {?.type == 'img' ? */}
            {/* <img className='border-2 py-10 rounded-lg w-5/5' alt="Travis Howard" src={'option.avatar'} /> */}
             <video className='border-2 rounded-lg w-5/5' autoPlay loop muted>
              <source src={Fit1} type="video/mp4" />
            </video>
            {/* } */}
        </>
      </div >
    </div>

  )

}

export default CardExercise











