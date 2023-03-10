import {Card, CardContent, Typography} from '@mui/material';

interface SavingsPrpos {
    title: string
    savings: number
}

export const SavingsBox = ({savings, title}: SavingsPrpos) => {

    return (
        <Card sx={{ width: 300, height: 180}} data-testid='savingsBox'>
            <CardContent>
                <Typography gutterBottom component="div" id="cardTitle">
                {title}
                </Typography> 
                <Typography color="text.secondary" id="numbersBoxes">
                {savings} kr
                </Typography>
            </CardContent>
        </Card>
    )
}