import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setInputNumber } from '../../../store/slice/exerciseSlice'
import { setUpdateInputNumber } from '../../../store/slice/routinesdaySlice'
import { createHistory } from '../../../store/slice/history'

const InputAddNumber = ({amountDay, IndexSet, Id, Ind, separator, amount, SetId, Index_Id, unit }) => {

  let newamount = 0

   amount?.map((amounts) =>{if(amounts[0]?.index_id == Index_Id){ newamount= amounts[0]?.amount}} )

  const [number, setNumber] = useState(newamount)
  const dispatch = useDispatch()
  const handleInputNumber = (e) => {
    setNumber(e.target.value)

  }
 
  useEffect(() => {
    if (separator == 1) { dispatch(setInputNumber({ number, Id, IndexSet, Ind })) }
  }, [number])



  return (
    <>
      <span>{unit}</span>
      <input placeholder='0' key={IndexSet} variant="filled" value={newamount} onChange={handleInputNumber} className='inputCard' type='number'></input>
    </>
  )
}

export default InputAddNumber
