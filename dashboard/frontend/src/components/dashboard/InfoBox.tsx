import { useNavigate } from 'react-router-dom';
import { ButtonBase, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import * as React from 'react';

const InfoBox = (props: {title: string, numberOfLicenses: number}) => {

    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate(`/licenses/${props.title}`);
    };

    return (
        <Card sx={{ width: 300}}>
            <CardActionArea sx={{paddingTop: 2, paddingBottom: 2}} onClick={handleCardClick}>
                <CardContent>
                  <Typography gutterBottom component="div" id="cardTitle">
                    {props.title}
                  </Typography>
                  <Typography color="text.secondary" id="numberOfLicenses">
                    {props.numberOfLicenses}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <ButtonBase onClick={handleCardClick} />
            </Card>
    )
}

export default InfoBox;