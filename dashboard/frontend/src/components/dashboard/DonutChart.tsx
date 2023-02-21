import React from 'react';
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';


const defaultLabelStyle = {
  fontSize: '4px',
  fontFamily: 'sans-serif',
  fill : 'white'
};

function DonutChart(){
  return(
  <div>
    <Card sx={{height: 425, width: 670, mt: 7}}>
      <CardContent>
        <Typography id="cardTitle" >
          Total oversikt
        </Typography>
        <Grid container spacing={2} direction="row">
          <Stack spacing={2}>
            <Typography>Aktiv</Typography>
            <Typography>Ledig</Typography>
            <Typography>Ubrukt</Typography>

          </Stack>
        <PieChart
          viewBoxSize={[140,140]}
          center={[70,40]}
          radius={30}
          label={({ dataEntry }) => dataEntry.key}
          labelStyle={{
            ...defaultLabelStyle,
          }}
          paddingAngle={1}
          lineWidth={40}
          labelPosition={80}
          
          data={[
                { title: 'Active', value: 50, color: '#63849c', key:"50%" },
                { title: 'Available', value: 30, color: '#3172ce', key:"30%" },
                { title: 'Unused', value: 20, color: '#0d90ff', key:"20%" },
                
          ]}
          
        />;
      </Grid>
      </CardContent>
    </Card></div>
  );
}

export default DonutChart;