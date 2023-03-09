import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ text, variant }) {
  const [open, setOpen] = React.useState(true);

  console.log(variant);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}   anchorOrigin={{ vertical: 'top', horizontal:'center' }}>
        {variant==1 ? <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>{text}</Alert> :
          variant==2 ? <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>{text}</Alert> :
            variant==3 ? <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>{text}</Alert> :
              variant==4 ? <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>{text}</Alert> : ''}
      </Snackbar>
    </Stack>
  );
}
