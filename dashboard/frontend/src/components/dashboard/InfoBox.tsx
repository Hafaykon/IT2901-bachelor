import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React from 'react';

const InfoBox = (props: { title: string, numberOfLicenses: number }) => {

  return (
    <Card sx={{ width: 300 }}>
      <CardActionArea sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <CardContent>
          <Typography gutterBottom component='div' id='cardTitle'>
            {props.title}
          </Typography>
          <Typography color='text.secondary' id='numberOfLicenses'>
            {props.numberOfLicenses}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default InfoBox;

