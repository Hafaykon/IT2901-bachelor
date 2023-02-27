import { useNavigate } from 'react-router-dom';
import { ButtonBase, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import * as React from 'react';



interface InfoBoxProps{
  title: string,
  numberOfLicenses: number,
}

function InfoBox ({title, numberOfLicenses}:InfoBoxProps) {
numberOfLicenses
    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate(`/licenses/${props.title}`);
    };

    return (
        <Card sx={{ width: 300, height: 180}}>
            <CardActionArea sx={{paddingBottom: 4}} onClick={handleCardClick}>
                <CardContent>
                  <Typography gutterBottom component="div" id="cardTitle">
                    {title}
                  </Typography>
                  <Typography color="text.secondary" id="numbersBoxes">
                    {numberOfLicenses}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <ButtonBase onClick={handleCardClick} />
            </Card>
    )
}

export default InfoBox;

