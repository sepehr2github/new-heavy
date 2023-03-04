import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { height } from '@mui/system';
import { Paper, Box } from '@mui/material';


export default function LabelBottomNavigation() {
  
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='flex sm:hidden  '>
      <Box sx={{ pb: 7, marginBottom: 0 }} >
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, width: "auto" }} value={value} onChange={handleChange} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >

            <BottomNavigationAction
              href='/routines'
              label="روتین"
              value="routin"
              icon={<FitnessCenterIcon fontSize="small" />}
            />
            <BottomNavigationAction
              href='/'
              label="خانه"
              value="home"
              icon={<HomeIcon fontSize="small" />}
            />
            <BottomNavigationAction
              href='/exercise'
              label="ورزش"
              value="exercise"
              icon={<ContentPasteIcon fontSize="small" />}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
}
