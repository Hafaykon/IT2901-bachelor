import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

const InfoBox = (props: {title: string, numberOfLicenses: number}) => {

    return (
        <Card sx={{ width: 300, height: 180}}>
            <CardActionArea sx={{paddingBottom: 4}}>
                <CardContent>
                  <Typography gutterBottom component="div" id="cardTitle">
                    {props.title}
                  </Typography>
                  <Typography color="text.secondary" id="numbersBoxes">
                    {props.numberOfLicenses}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
    )
}

export default InfoBox;

