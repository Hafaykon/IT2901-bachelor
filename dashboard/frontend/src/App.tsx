import React from 'react';
import './App.css';
import InfoBox from './components/dashboard/InfoBox';
import { Stack } from '@mui/material';

function App() {
  return (
    <><div className={'App'}>
        <Stack direction="row" spacing={8}>
        <InfoBox title="Totale Lisenser" numberOfLicenses={2100} />
        <InfoBox title="Aktive Lisenser" numberOfLicenses={2000} />
        <InfoBox title="Allokerbare Lisenser" numberOfLicenses={100} />
      </Stack>
    </div></>
   
  );
}


export default App;
