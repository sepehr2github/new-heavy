import react, { useState, forwardRef, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { done } from '../../store/slice/exerciseSlice';
import { useDispatch } from 'react-redux';
import { setDone } from '../../store/slice/routinesdaySlice'
import Slide from '@mui/material/Slide';
import UrgeWithPleasureComponent from './progressBar'

const CheckBox = ({ IdSet, IdEx, amount }) => {

  const [check, setCheck] = useState(false)

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const dispatch = useDispatch()

  const success = () => {
    setCheck(!check)
  }

  useEffect(() => {
    dispatch(setDone({ IdSet, IdEx, check }))
  }, [check])

  return (
    <div >
      <Checkbox {...label} onClick={success} />
      {check ? 
      amount !== 0 ?
       <UrgeWithPleasureComponent amount={amount} check={check} /> 
       :''
       : ''}
    </div>
  );
}

export default CheckBox
