
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import * as React from 'react';

interface InfoBoxProps{
  title: string,
  numberOfLicenses: number,
}

function InfoBox ({title, numberOfLicenses}:InfoBoxProps) {

    return (
        <Card sx={{ width: 300}}>
            <CardActionArea sx={{paddingTop: 2, paddingBottom: 2}}>
                <CardContent>
                  <Typography gutterBottom component="div" id="cardTitle">
                    {title}
                  </Typography>
                  <Typography color="text.secondary" id="numberOfLicenses">
                    {numberOfLicenses}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
    )
}

export default InfoBox;

