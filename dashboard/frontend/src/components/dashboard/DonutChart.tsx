import React from 'react';
import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';

const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
  fill : 'white'
};

function DonutChart(){
  return(
  <div>
    <Card sx={{height:400,width:663,mt: 7, ml:14}}>
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
          paddingAngle={1}
          lineWidth={40}
          labelPosition={80}
          
          data={[
                { title: 'Active', value: 50, color: '#63849c', key:"50%" },
                { title: 'Available', value: 30, color: '#3172ce', key:"30%" },
                { title: 'Unused', value: 20, color: '#0d90ff', key:"20%" },
                
          ]}
          
        />;
      </CardContent>
    </Card></div>
  );
}

export default DonutChart;