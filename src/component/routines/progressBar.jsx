import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Button, Dialog, DialogActions, DialogContent, DialogContentT, DialogTitle, Slide, Typography, DialogContentText } from '@mui/material';
import react, { useState, forwardRef ,useEffect} from 'react'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UrgeWithPleasureComponent = ({ amount, check }) => {

  let nAmount = Number(amount)

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(check)

  }, [check])

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      className='progressBar'
    >
      <DialogTitle className='checkBox '> <Typography>  لطفا استراحت کنید</Typography></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <CountdownCircleTimer
            isPlaying
            duration={nAmount}
            colors={['#0e0c82', '#184dba', '#1e56c9', '#2e6cec','#477ff2' , '#6194fc']}
            colorsTime={[nAmount,nAmount / 2,nAmount / 3, nAmount / 4, nAmount / 5, 0]}
            updateInterval={1}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className='checkBox' onClick={handleClose}><Typography >پایان استراحت</Typography></Button>
      </DialogActions>
    </Dialog>



  )

}
export default UrgeWithPleasureComponent