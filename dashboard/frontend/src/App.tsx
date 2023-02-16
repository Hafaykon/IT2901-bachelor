import React from 'react';
import './App.css';
import InfoBox from './components/dashboard/InfoBox';
import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';
import DonutChart from './components/dashboard/DonutChart';


const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
};

function App() {
  return (
    <><div className={'App'}>
        <Stack direction="row" spacing={8}>
        <InfoBox title="Totale Lisenser" numberOfLicenses={2100} />
        <InfoBox title="Aktive Lisenser" numberOfLicenses={2000} />
        <InfoBox title="Allokerbare Lisenser" numberOfLicenses={100} />
      </Stack>
    </div>
    <DonutChart/>
  </>
  );
}





export default App;
