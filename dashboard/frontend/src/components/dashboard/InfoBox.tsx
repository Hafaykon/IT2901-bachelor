
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import * as React from 'react';

const InfoBox = (props: {title: string, numberOfLicenses?: number, savings?: number}) => {

    return (
        <Card sx={{ width: 300, height: 200}}>
            <CardActionArea sx={{paddingTop: 2, paddingBottom: 4}}>
                <CardContent>
                  <Typography gutterBottom component="div" id="cardTitle">
                    {props.title}
                  </Typography>
                  <Typography color="text.secondary" id="numberOfLicenses">
                    {props.numberOfLicenses}
                    {props.savings}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
    )
}

export default InfoBox;

