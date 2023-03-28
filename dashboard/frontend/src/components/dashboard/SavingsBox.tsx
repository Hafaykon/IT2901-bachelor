import './Dashboard.css';
import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import CardOverflow from '@mui/joy/CardOverflow';
import { useNavigate } from 'react-router-dom';
import { hover } from '@testing-library/user-event/dist/hover';

export function SavingsBox() {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/leaderboard`);

    };

    return (
        <Card sx={{ width: 300, height: 180, borderRadius: 5, ':hover' : {boxShadow: 20}}} data-testid='savingsBox'>
            <CardActionArea sx={{paddingBottom: 4}} onClick={handleCardClick}>
            <CardOverflow>
                <CardContent>
                    <Stack direction={'row'}>
                    <Typography id="cardTitle">
                      Kroner spart
                    </Typography>
                        {/*  <SavingsIcon fontSize='large' sx={{position: 'absolute', top:20, right:15, color:'pink'}}></SavingsIcon> */}
                    </Stack>
                    <Typography id="numbersBoxes">
                      100 kr
                    </Typography>


                </CardContent>
            </CardOverflow>
            </CardActionArea>
        </Card>

    )
}