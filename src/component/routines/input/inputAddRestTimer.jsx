import React , {useState , useEffect }from 'react'
import { useDispatch } from 'react-redux';
import {addRestTimer } from '../../../store/slice/exerciseSlice';
import {setUpdateRestTimer} from '../../../store/slice/routinesdaySlice'
import {FormControl ,InputLabel ,Select ,MenuItem} from '@mui/material'

const InputAddRestTimer = ({Id , separator ,amount}) => {

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
                    <MenuItem value={0}>OFF</MenuItem>
                    <MenuItem value={5}> 5s</MenuItem>
                    <MenuItem value={10}> 10s</MenuItem>
                    <MenuItem value={15}>15s</MenuItem>
                    <MenuItem value={20}>20s</MenuItem>
                    <MenuItem value={25}>25s</MenuItem>
                    <MenuItem value={30}>30s</MenuItem>
                    <MenuItem value={35}>35s </MenuItem>
                    <MenuItem value={40}>40s</MenuItem>
                    <MenuItem value={45}>45s</MenuItem>
                    <MenuItem value={50}>50s</MenuItem>
                    <MenuItem value={55}>55s</MenuItem>
                    <MenuItem value={60}>1min 0s</MenuItem>
                    <MenuItem value={65}>1min 5s</MenuItem>
                    <MenuItem value={70}>1min 10s</MenuItem>
                    <MenuItem value={75}>1min 15s</MenuItem>
                    <MenuItem value={80}>1min 20s</MenuItem>
                    <MenuItem value={85}>1min 25s</MenuItem>
                    <MenuItem value={90}>1min 30s</MenuItem>
                    <MenuItem value={95}>1min 35s</MenuItem>
                    <MenuItem value={100}>1min 40s</MenuItem>

                </Select>
            </FormControl>
                        </>
    )
}

export default InputAddRestTimer
