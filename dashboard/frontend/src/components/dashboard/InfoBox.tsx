import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { ButtonBase, Card, CardActionArea, CardContent, Stack, Tooltip, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

interface InfoBoxProps {
    title: string,
    numberOfLicenses: number,
}

function InfoBox({title, numberOfLicenses}: InfoBoxProps) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/licenses/${title}`);
    };

  let info = "";
  {
    {title=="Totale Lisenser" ?  info = 'Totale lisenser er alle lisenser du har tilgjengelig i enheten din.':
    title=="Uåpnede Lisenser" ? info = 'Uåpnede lisenser er lisenser for programvare som aldri har blitt åpnet.' : 
    info = 'Ledige lisenser er lisenser for programvare som ikke har blitt åpnet på 90 dager.'}
  }


    return (
        <Card sx={{ width: 300, height: 180}} data-testid="infoBox-test">
            <CardActionArea sx={{paddingBottom: 4}} onClick={handleCardClick}>
                <CardContent>
                  <Stack direction={'row'}>
                    <Typography gutterBottom component="div" id="cardTitle">
                      {title}
                    </Typography>
                    <Tooltip title={<h2 style={{fontSize: 15, fontWeight: 'lighter'}}>{info}</h2>} placement='top' arrow>
                          <HelpIcon sx={{position: 'absolute', top: 28, right:15, color:'grey', fontSize: 25}} ></HelpIcon>
                    </Tooltip>
                  </Stack>
                  <Typography color="text.secondary" id="numbersBoxes">
                    {numberOfLicenses}
                  </Typography>
                </CardContent>
            </CardActionArea>
            <ButtonBase onClick={handleCardClick}/>
        </Card>
    )
}

export default InfoBox;

