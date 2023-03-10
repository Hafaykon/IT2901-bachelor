import {Grid, Stack} from '@mui/material';
import React, {useEffect, useState} from 'react';
import SoftwareSearchBar from '../search/SoftwareSeachBar';
import LicenseTableV2 from "./LicenseTableV2";
import {SoftwareUser} from "../../Interfaces";
import {fetchPoolData, fetchSoftwareUsedInOrg} from "../../api/calls";

function LicensePool() {
    const org = JSON.parse(localStorage.getItem('organization') ?? 'null');
    const [searchTerm, setSearchTerm] = useState<string>();
    const [orgSoftware, setOrgSoftware] = useState<string[]>([]);
    const [data, setData] = useState<SoftwareUser[]>([]);

    // Function that gets input from the searchBar component.
    const handleChange = (term: string) => {
        setSearchTerm(term);
    }
    useEffect(() => {
        // Fetches distinct software names.
        const fetchSoftwareNames = async () => {

            try {
                const data: string[] | undefined = await fetchSoftwareUsedInOrg('active', org);
                if (data !== undefined) {
                    setOrgSoftware(data);
                }
            } catch (error) {
                console.error('Error fetching software names:', error);
            }
        };
        fetchSoftwareNames();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm !== undefined)
                try {
                    const data = await fetchPoolData(searchTerm, org);
                    data && setData(data);
                    console.log(data)
                } catch (error) {
                    console.error('Error fetching license data:', error);
                }
        }
        fetchData()

    }, [searchTerm])

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
                            <SoftwareSearchBar setSelectedSoftware={handleChange} data={orgSoftware}/>
                        </Stack>
                    </Grid>
                </Grid>
                <br/>
                <Grid container style={{display: 'flex', justifyContent: 'center', alignItems: "center", width: "100%"}}
                      className={'license_table'}>

                    <LicenseTableV2 data={data}/>
                </Grid>


            </Grid>
        </div>
    );
}

export default LicensePool;