import React from 'react';
import './App.css';
import InfoBox from './components/dashboard/InfoBox';
import { Grid, Stack } from '@mui/material';
import DonutChart from './components/dashboard/DonutChart';
import { SavingsBox } from './components/dashboard/SavingsBox';

function App() {
  return (
    <><Grid container className='boxes'>
      <Grid item>
        <Stack direction="row" spacing={8}>
          <InfoBox title="Totale Lisenser" numberOfLicenses={2100} />
          <InfoBox title="Aktive Lisenser" numberOfLicenses={2000} />
          <InfoBox title="Allokerbare Lisenser" numberOfLicenses={100} />
        </Stack>
      </Grid>
      <DonutChart/>
      <Grid item sx={{ml: 8, mt: 7}}>
        <Stack direction={'column'} spacing={8}>
          <SavingsBox title="Potensiell Sparing" savings={2000}/>
          <SavingsBox title="Kroner Spart" savings={400}/>
        </Stack>
      </Grid>
    </Grid></>
  );
}





export default App;
