import { Grid } from '@mui/material';
import React from 'react';
import ActiveLastBreadcrumb from '../components/ActivateLastBreadcrumb';

function MyPage() {
    return (
        <div>
            <Grid sx={{paddingTop: 5, paddingLeft: 25}}>
                <ActiveLastBreadcrumb />
            </Grid>
            <h1>Min side</h1>
        </div>
    );
}

export default MyPage;