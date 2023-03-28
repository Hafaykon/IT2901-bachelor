import './Dashboard.css';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import CardOverflow from '@mui/joy/CardOverflow';

export function SavingsBox() {

    return (
        <Card sx={{ width: 300, height: 100 }} data-testid='savingsBox'>
            <CardOverflow>
                <CardContent>
                    <Stack direction={'row'}>
                    <Typography id="cardTitle">
                      Kroner spart
                    </Typography>
                    </Stack>
                </CardContent>
            </CardOverflow>
        </Card>

    )
}