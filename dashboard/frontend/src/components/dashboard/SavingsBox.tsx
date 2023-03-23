import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import CardOverflow from '@mui/joy/CardOverflow';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';

export function SavingsBox() {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/leaderboard`);

    };

    return (
        <Card sx={{ width: 300, height: 300, borderRadius: 5 }} data-testid='savingsBox'>
            <CardActionArea sx={{paddingBottom: 4}} onClick={handleCardClick}>
            <CardOverflow>
                <CardContent>
                    <Stack direction={'row'}>
                        {/*  <SavingsIcon fontSize='large' sx={{position: 'absolute', top:20, right:15, color:'pink'}}></SavingsIcon> */}
                    </Stack>
                    <Typography color="text.secondary" id="numbersBoxes">
                        <BarChartIcon sx={{ fontSize: 100, color: '#80CC9F' }}></BarChartIcon>
                        <p style={{ fontSize: '25px', fontWeight: 'semi-bold', marginTop: '-10px' }}>Din enhet er på <span style={{ fontWeight: 'bold' }}>x plass</span>.</p>
                        <p style={{ fontSize: '15px', fontStyle: 'italic' }}>Du må øke aktive lisenser til x prosent for å klatre på listen.</p>
                    </Typography>

                </CardContent>
            </CardOverflow>
            </CardActionArea>
        </Card>

    )
}