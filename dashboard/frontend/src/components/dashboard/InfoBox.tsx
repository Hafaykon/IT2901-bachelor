
import { ButtonBase, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import * as React from 'react';

const InfoBox = (props: {title: string, numberOfLicenses: number}) => {

    return (
        <Card sx={{ width: 300}}>
          <ButtonBase onClick={}>
            <CardActionArea sx={{paddingTop: 2, paddingBottom: 2}}>
                <CardContent>
                  <Typography gutterBottom component="div" id="cardTitle">
                    {props.title}
                  </Typography>
                  <Typography color="text.secondary" id="numberOfLicenses">
                    {props.numberOfLicenses}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </ButtonBase>
            </Card>
    )
}

export default InfoBox;

