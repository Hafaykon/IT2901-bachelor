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
                      <p>Kroner spart</p>
                      <p>100 kr</p>

                    </Typography>

                </CardContent>
            </CardOverflow>
            </CardActionArea>
        </Card>

    )
}