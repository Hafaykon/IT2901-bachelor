import {Grid, Stack} from '@mui/material';
import React from 'react';
import SoftwareSearchBar from '../search/SoftwareSeachBar';
import LicenseTableV2 from "./LicenseTableV2";

function LicensePool() {
    return (
        <div id={'licensepool_container'} style={{display: 'flex', justifyContent: 'center'}}>
            <Grid container className='license_pool'>
                <Grid item>
                    <Stack direction='row' spacing={20}>
                        <h1>Lisensportalen</h1>
                    </Stack>
                </Grid>
                <Grid container className={'license_parameters'}
                      style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: '10px'}}>
                    <Grid item>
                        <Stack direction='row' spacing={5}>
                            <SoftwareSearchBar show={true}/>
                        </Stack>
                    </Grid>
                </Grid>
                <br/>
                <Grid container style={{display: 'flex', justifyContent: 'center', alignItems: "center", width: "100%"}} className={'license_table'}>
                    <LicenseTableV2/>
                </Grid>


            </Grid>
        </div>
    );
}

export default LicensePool;