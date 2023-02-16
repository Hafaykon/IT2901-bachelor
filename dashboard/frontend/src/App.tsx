import React from 'react';
import './App.css';
import InfoBox from './components/dashboard/InfoBox';
import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';


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
    </div><div>
    <Card id="stats">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Overskrift
        </Typography>
        <PieChart
          viewBoxSize={[140,140]}
          center={[70,40]}
          radius={30}
          label={({ dataEntry }) => dataEntry.key}
          labelStyle={{
            ...defaultLabelStyle,
          }}
          data={[
                { title: 'One', value: 20, color: '#E38627', key:"20%" },
                { title: 'Two', value: 30, color: '#C13C37', key:"30%" },
                { title: 'Three', value: 50, color: '#6A2135', key:"50%" },
                
          ]}
          
        />;
      </CardContent>
    </Card></div></>
   
  );
}





export default App;
