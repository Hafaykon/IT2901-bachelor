import React from 'react';
import { Grid, Typography } from '@mui/material';
import ActiveLastBreadcrumb from '../components/ActivateLastBreadcrumb';
import './FAQ.css';

function FAQ() {
    return (
        <div>
            <Grid container sx={{paddingTop: 5, paddingLeft: 25}}>
                <ActiveLastBreadcrumb />
            </Grid>
            <Grid className='Header'>
                <Typography id="Headline">Ofte stilte spørsmål</Typography>
                <p style={{ fontStyle: 'italic', marginBottom: '30px' }}>
                    Nedenfor ser du en oversikt over ofte stilte spørsmål om lisensdashboardet, 
                    lisensportalen, og lisensadministrering generelt. 
                </p>
            </Grid>
            <Grid container id="Columns">
                <Grid container rowSpacing={2} id="FAQs">
                    <Grid item xs={4}>
                        <h3 className='SubHeadline'>Lisensdashboard</h3>
                    </Grid>
                    <Grid item xs={4}>
                        <h3 className='SubHeadline'>Lisensportalen</h3>
                    </Grid>
                    <Grid item xs={4}>
                        <h3 className='SubHeadline'>Lisensadministrering generelt</h3>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default FAQ;