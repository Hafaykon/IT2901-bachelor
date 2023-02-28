import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React from 'react';

interface InfoBoxProps{
  title: string,
  numberOfLicenses: number,
}

function InfoBox ({title, numberOfLicenses}:InfoBoxProps) {
    return (
        <Card sx={{ width: 300, height: 180}}>
            <CardActionArea sx={{paddingBottom: 4}}>
                <CardContent>
                  <Typography gutterBottom component="div" id="cardTitle">
                    {title}
                  </Typography>
                  <Typography color="text.secondary" id="numbersBoxes">
                    {numberOfLicenses}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
    )
}

export default InfoBox;

