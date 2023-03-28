import React from 'react';
import { Grid, Typography } from '@mui/material';
import ActiveLastBreadcrumb from '../components/ActivateLastBreadcrumb';
import './FAQ.css';

function FAQ() {
    return (
        <div>
            <Grid sx={{paddingTop: 5, paddingLeft: 25}}>
                <ActiveLastBreadcrumb />
            </Grid>
            <Grid className='Container'>
                <Typography id="Headline">Ofte stilte spørsmål</Typography>
            </Grid>
        </div>
    );
}

export default FAQ;