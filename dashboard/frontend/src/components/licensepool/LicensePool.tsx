import {Box, Grid, Stack} from '@mui/material';
import React, {useEffect, useState} from 'react';
import SoftwareSearchBar from '../search/SoftwareSeachBar';
import PoolTable from "./PoolTable";
import {LicensePoolData} from "../../Interfaces";
import {fetchPoolData, fetchSoftwareUsedInOrg} from "../../api/calls";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ActiveLastBreadcrumb from '../ActivateLastBreadcrumb';

function LicensePool() {
    const org = JSON.parse(localStorage.getItem('organization') ?? 'null');
    const [searchTerm, setSearchTerm] = useState<string>();
    const [orgSoftware, setOrgSoftware] = useState<string[]>([]);
    const [data, setData] = useState<LicensePoolData[]>([]);
    const [checked, setChecked] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    // Function that gets input from the searchBar component.
    const updateSearchTerm = (term: string) => {
        setSearchTerm(term);
    }

    useEffect(() => {

        const fetchInitialData = async () => {
            if (searchTerm == '' || searchTerm == undefined) {
                setData([])
                try {
                    const {data, error, message} = await fetchPoolData(undefined, checked ? org : '');
                    if (error) {
                        setErrorMessage(message);
                        setData([])
                    } else {
                        setData(data);
                    }
                    console.log(data);
                } catch (error) {
                    console.error('Error fetching license data:', error);
                }

            }

        };
        fetchInitialData();
    }, [checked, searchTerm]);

    useEffect(() => {
        setErrorMessage('')
        // Fetches distinct software names.
        const fetchSoftwareNames = async () => {
            try {
                const data: string[] | undefined = await fetchSoftwareUsedInOrg('active', '');
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
        setErrorMessage('')
        const fetchData = async () => {
            if (searchTerm && searchTerm !== "") {
                try {
                    const {data, error, message} = await fetchPoolData(searchTerm, checked ? org : '');
                    setData(data)
                    if (error) {
                        setErrorMessage(message);
                        setData([])
                    } //else data && setData(data);
                } catch (error) {
                    console.error('Error fetching license data:', error);
                }
            } else {
                setData([]); // Clear the data when searchTerm is empty or undefined
            }
        }
        fetchData()

    }, [searchTerm, checked]);

    return (
        <div>
            <Grid sx={{paddingTop: 5, paddingLeft: 27}}>
                <ActiveLastBreadcrumb />
            </Grid>
            <Box id={'licensepool_container'} style={{display: 'flex', justifyContent: 'center', marginTop: "20px"}}>
                <Grid container className='license_pool'>
                    <Grid container className={'license_parameters'}
                        style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: '10px'}}>
                        <Grid item>
                            <>
                                <h2 style={{textAlign: "center"}}>Lisensportalen</h2>
                                <h4 style={{textAlign: "center"}}>-Velg miljøvennlig!</h4>

                            </>
                            <Stack direction={'row'} spacing={2}>
                                <SoftwareSearchBar setSelectedSoftware={updateSearchTerm} data={orgSoftware}/>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleChange}
                                            inputProps={{'aria-label': 'controlled'}}
                                        />
                                    }
                                    label="Bare egen organisasjon"
                                />


                            </Stack>
                            {errorMessage && <h3 style={{color: 'red'}}>{errorMessage}</h3>}
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container style={{display: 'flex', justifyContent: 'center', alignItems: "center", width: "100%"}}
                        className={'license_table'}>

                        <PoolTable data={data}/>
                    </Grid>


                </Grid>
                </Box>
        </div>
    );
}

export default LicensePool;