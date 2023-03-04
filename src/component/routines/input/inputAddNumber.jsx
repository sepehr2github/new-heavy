import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setInputNumber } from '../../../store/slice/exerciseSlice'
import { setUpdateInputNumber } from '../../../store/slice/routinesdaySlice'
import { createHistory } from '../../../store/slice/history'

const InputAddNumber = ({amountDay, IndexSet, Id, Ind, separator, amount, SetId, Index_Id, unit }) => {

  let newamount = 0
  console.log(amountDay);
   amount?.map((amounts) =>{if(amounts[0]?.index_id == Index_Id){ newamount= amounts[0]?.amount}} )
  //  if(amountDay?.index_id == Index_Id ) {newamount = amountDay?.amount}

  //  useEffect(() => {
    // 
  //  setNumber(amount)
// 
  //  }, [amount])
  //  
  const [number, setNumber] = useState(newamount)
  const dispatch = useDispatch()
  const handleInputNumber = (e) => {
    setNumber(e.target.value)

  }
  // console.log(amount ,Index_id );

  console.log('newamount' + newamount , 'number' + number);
  useEffect(() => {
    if (separator == 1) { dispatch(setInputNumber({ number, Id, IndexSet, Ind })) }
    // else if (separator == 2 && number) {
      // dispatch(setUpdateInputNumber({number, newamount, Id, SetId, Index_Id }));
      // dispatch(createHistory({ number, Id, SetId, Index_Id }))
    //}
  }, [number])



  return (
    <>
      <span>{unit}</span>
      <input placeholder='0' key={IndexSet} variant="filled" value={newamount} onChange={handleInputNumber} className='inputCard' type='number'></input>
    </>
  )
}

export default InputAddNumber
