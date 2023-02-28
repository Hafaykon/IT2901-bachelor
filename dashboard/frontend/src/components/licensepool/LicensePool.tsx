import {Grid, Stack} from '@mui/material';
import React from 'react';
import SoftwareSearchBar from "../search/SoftwareSeachBar";
import FilterSelect from "../search/FilterSelect";
import SortSelect from "../search/SortSelect";
import LicenseTable from "./LicenseTable";

function LicensePool() {
    return (
        <div>
            <Grid container className='license_pool'>
                <Grid item>
                    <Stack direction="row" spacing={20}>
                        <h1>Lisensportalen</h1>
                    </Stack>
                </Grid>
                <Grid container className={'license_parameters'}>
                    <Grid item>
                        <Stack direction="row" spacing={30}>
                            <SoftwareSearchBar/>
                            <FilterSelect/>
                            <SortSelect/>
                        </Stack>
                    </Grid>
                </Grid>
                <br/>
                <Grid container style={{display: "flex", justifyContent: "center"}} className={'license_table'}>
                    <LicenseTable/>
                </Grid>


            </Grid>
        </div>
    );
}

export default LicensePool;