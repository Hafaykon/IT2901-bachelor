import { Card, CardContent, Stack, Typography } from '@mui/material';
import CardOverflow from '@mui/joy/CardOverflow';


interface SavingsPrpos {
    title: string
    savings: number
}

export const SavingsBox = ({savings, title}: SavingsPrpos) => {

    return (
        <Card sx={{ width: 300, height: 180, borderRadius: 5}} data-testid='savingsBox'>
            <CardOverflow>
                <CardContent>
                    <Stack direction={'row'}>
                        <Typography gutterBottom component="div" id="cardTitle">
                            {title}
                        </Typography>
                       {/*  <SavingsIcon fontSize='large' sx={{position: 'absolute', top:20, right:15, color:'pink'}}></SavingsIcon> */}
                    </Stack>
                    <Typography color="text.secondary" id="numbersBoxes">
                        {savings} kr
                    </Typography>
                </CardContent>
            </CardOverflow>
        </Card>
    )
}