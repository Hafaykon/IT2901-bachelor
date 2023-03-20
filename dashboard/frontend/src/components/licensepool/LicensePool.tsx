import {Grid, Stack} from '@mui/material';
import React, {useEffect, useState} from 'react';
import SoftwareSearchBar from '../search/SoftwareSeachBar';
import PoolTable from "./PoolTable";
import {LicensePoolData} from "../../Interfaces";
import {fetchPoolData, fetchSoftwareUsedInOrg} from "../../api/calls";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

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
        <div id={'licensepool_container'}
             style={{display: 'flex', justifyContent: 'center', alignContent: "center", marginTop: "20px"}}>
            <Grid container className='license_pool' justifyContent={"center"}>
                <Grid container justifyContent="center" alignItems="center" className={'license_table'} width={"75%"}>
                    <Stack direction={"column"} spacing={1} width={"95%"} marginBottom={"10px"}>
                        <h2 style={{fontFamily:'Source Sans Pro, sans-serif'}}> Lisensportalen</h2>
                        <h4 style={{
                            fontFamily: 'Source Sans Pro, sans-serif',
                            fontStyle: "italic",
                            fontWeight: 200,
                            marginTop: "-1%"
                        }}>-Velg miljøvennlig!</h4>
                    </Stack>
                    <Stack direction={'row'} spacing={5} width={"95%"} marginBottom={"30px"} alignItems="center" marginTop={"10px"}>
                        <SoftwareSearchBar setSelectedSoftware={updateSearchTerm} data={orgSoftware}/>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{'aria-label': 'controlled'}}
                                />
                            }
                            label="Bare egen enhet"
                        />
                        {errorMessage && <h3 style={{color: 'red'}}>{errorMessage}</h3>}

                    </Stack>
                    <PoolTable data={data}/>
                </Grid>
            </Grid>
        </div>
    );

}

export default LicensePool;