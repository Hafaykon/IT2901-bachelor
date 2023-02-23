import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { ButtonBase, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

interface InfoBoxProps{
  title: string,
  numberOfLicenses: number,
}

function InfoBox ({title, numberOfLicenses}:InfoBoxProps) {
    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate(`/licenses/${title}`);
    };

    return (
        <Card sx={{ width: 300, height: 180}} data-testid="infoBox-test">
            <CardActionArea sx={{paddingBottom: 4}} onClick={handleCardClick}>
                <CardContent>
                  <Stack direction={'row'}>
                    <Typography gutterBottom component="div" id="cardTitle">
                      {title}
                    </Typography>
                    <HelpIcon sx={{position: 'absolute', top: 15, right:15, color:'grey'}}></HelpIcon>
                  </Stack>
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

