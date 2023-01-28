import React ,{ useState , useEffect}from 'react'
import { useDispatch } from 'react-redux'
import {Input, Typography} from '@mui/material'
import { addTitle } from '../../../store/slice/exerciseSlice'
import { setTitle } from '../../../store/slice/updateRoutineSlice'

const InputAddTitle = () => {

    const dispatch = useDispatch()
    const [mainTitle, setMainTitle] = useState()

    const handleTitle = (e) => {
        setMainTitle(e.target.value)
    }
    useEffect(() => {

    dispatch(addTitle({mainTitle}))

    }, [mainTitle])


    return (
        <div>
            <Input className="input-main-title"
                placeholder="نام روتین (ضروری)"
                value={mainTitle} onChange={handleTitle}
            />
        </div>
    )



}

export default InputAddTitle
