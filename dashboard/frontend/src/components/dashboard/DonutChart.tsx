import React from 'react';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';


const defaultLabelStyle = {
  fontSize: '4px',
  fontFamily: 'sans-serif',
  fill: 'white'
};

function DonutChart() {
  return (
    <div data-testid="donutChart">
      <Card sx={{ height: 425, width: 670, mt: 7 }}>
        <CardContent>
          <Typography sx={{textAlign:'left', fontSize:25, padding: 2, color:'#002d53', fontStyle: 'Source Sans Pro,sans-serif'}} >
            Total oversikt
          </Typography>
          <Stack direction="row" sx={{paddingLeft: 7}}>
            <Stack spacing={5} sx={{ paddingTop: 7.5, paddingLeft: 3 }}>
            <Box
                sx={{
                  width: 10,
                  height: 10,
                  backgroundColor: '#63849c',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              />
                 <Box
                sx={{
                  width: 10,
                  height: 10,
                  backgroundColor: '#3172ce',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              />
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  backgroundColor:'#0d90ff',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              />
            </Stack>
            <Stack spacing={4} sx={{ paddingTop: 6, paddingLeft: 3, paddingRight:-50, color:'#002d53', fontStyle: 'Source Sans Pro,sans-serif'}}>
              <Typography>
                Aktiv</Typography>
              <Typography>Ledig</Typography>
              <Typography>Ubrukt</Typography>

            </Stack>
            <PieChart 
              viewBoxSize={[140, 140]}
              center={[70, 40]}
              radius={40}
              label={({ dataEntry }) => dataEntry.key}
              labelStyle={{
                ...defaultLabelStyle,
              }}
              paddingAngle={1}
              lineWidth={40}
              labelPosition={80}

              data={[
                { title: 'Aktiv', value: 50, color: '#63849c', key: "50%" },
                { title: 'Ledig', value: 30, color: '#3172ce', key: "30%" },
                { title: 'Ubrukte', value: 20, color: '#0d90ff', key: "20%" },

              ]}

            />
          </Stack>
        </CardContent>
      </Card></div>
  );
}

export default DonutChart;