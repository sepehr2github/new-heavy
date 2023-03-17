import React , {useState , useEffect }from 'react'
import { useDispatch } from 'react-redux';
import {addRestTimer } from '../../../store/slice/exerciseSlice';
import {setUpdateRestTimer} from '../../../store/slice/routinesdaySlice'
import {FormControl ,InputLabel ,Select ,MenuItem} from '@mui/material'

const InputAddRestTimer = ({Id , separator ,amount=0}) => {

   
    const [restTimer, setRestTimer] = useState(amount);
    const dispatch = useDispatch()

    const handleChangeTimer = (e) => {
        setRestTimer(e.target.value);
    }
    
    useEffect(() => {
       if(separator==1) {dispatch(addRestTimer ({ Id, restTimer }))}
       if(separator==2){dispatch(setUpdateRestTimer({Id , restTimer}))}   
    }, [restTimer])
    

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 80 }} >
                <InputLabel  id="demo-simple-select-autowidth-label">Timer</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChangeTimer}
                    autoWidth
                    label="timer"
                    value={restTimer}
                >
                    <MenuItem key={0}   value={0}  >OFF</MenuItem>
                    <MenuItem key={5}   value={5}  > 5s</MenuItem>
                    <MenuItem key={10}  value={10} > 10s</MenuItem>
                    <MenuItem key={15}  value={15} >15s</MenuItem>
                    <MenuItem key={20}  value={20} >20s</MenuItem>
                    <MenuItem key={25}  value={25} >25s</MenuItem>
                    <MenuItem key={30}  value={30} >30s</MenuItem>
                    <MenuItem key={35}  value={35} >35s </MenuItem>
                    <MenuItem key={40}  value={40} >40s</MenuItem>
                    <MenuItem key={45}  value={45} >45s</MenuItem>
                    <MenuItem key={50}  value={50} >50s</MenuItem>
                    <MenuItem key={55}  value={55} >55s</MenuItem>
                    <MenuItem key={60}  value={60} >1min 0s</MenuItem>
                    <MenuItem key={65}  value={65} >1min 5s</MenuItem>
                    <MenuItem key={70}  value={70} >1min 10s</MenuItem>
                    <MenuItem key={75}  value={75} >1min 15s</MenuItem>
                    <MenuItem key={80}  value={80} >1min 20s</MenuItem>
                    <MenuItem key={85}  value={85} >1min 25s</MenuItem>
                    <MenuItem key={90}  value={90} >1min 30s</MenuItem>
                    <MenuItem key={95}  value={95} >1min 35s</MenuItem>
                    <MenuItem key={100} value={100}>1min 40s</MenuItem>

                </Select>
            </FormControl>
                        </>
    )
}

export default InputAddRestTimer
