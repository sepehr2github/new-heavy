import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setInputNumber } from '../../../store/slice/exerciseSlice'
import { setUpdateInputNumber } from '../../../store/slice/routinesdaySlice'
import { createHistory } from '../../../store/slice/history'

const InputAddNumberRoutinDay = ({ amountDay, IndexSet, Id, amount, SetId, Index_Id, unit }) => {

  let newamount = 0

  if (amountDay[0]?.index_id == Index_Id) { newamount = amountDay[0]?.amount }



  const [number, setNumber] = useState(newamount)

  const dispatch = useDispatch()
  const handleInputNumber = (e) => {
    setNumber(e.target.value)

  }

  useEffect(() => {
    dispatch(setUpdateInputNumber({ number, newamount, IndexSet, Id, SetId, Index_Id }));

  }, [number])

  return (
    <>
      <span>{unit}</span>
      <input placeholder='0' key={IndexSet} variant="filled" value={newamount} onChange={handleInputNumber} className='inputCard' type='number'></input>
    </>
  )
}

export default InputAddNumberRoutinDay
