import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import * as React from 'react';

interface SavingsPrpos {
    savings: number
}

export const SavingsBox = (props: {savings: number}) => {

    return (
        <Card sx={{ width: 300, height: 200}}>
                <CardContent>
                  <Typography gutterBottom component="div" id="cardTitle">
                  </Typography>
                  <Typography color="text.secondary" id="numbersBoxes">
                    {props.savings}
                  </Typography>
                </CardContent>
            </Card>
    )
}