import './Dashboard.css';
import {Card, CardContent, Stack, Typography} from '@mui/material';
import CardOverflow from '@mui/joy/CardOverflow';

export function SavingsBox() {

    return (
        <Card sx={{width: 300, height: 140, borderRadius: 5}} data-testid='savingsBox'>
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
        </Card>

    )
}