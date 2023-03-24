import {Box, Grid, Stack} from '@mui/material';
import React, {useEffect, useState} from 'react';
import SoftwareSearchBar from '../search/SoftwareSeachBar';
import PoolTable from "./PoolTable";
import {LicensePoolData} from "../../Interfaces";
import {fetchPoolData, fetchSoftwareUsedInOrg} from "../../api/calls";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from "@mui/material/Pagination";
import ActiveLastBreadcrumb from "../ActivateLastBreadcrumb";

function LicensePool() {
    const org = JSON.parse(localStorage.getItem('organization') ?? 'null');
    const [searchTerm, setSearchTerm] = useState<string>();
    const [orgSoftware, setOrgSoftware] = useState<string[]>([]);
    const [data, setData] = useState<LicensePoolData[]>([]);
    const [checked, setChecked] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const ITEMS_PER_PAGE = 10;
    const [count, setCount] = useState<number>(0);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };


    // Function that gets input from the searchBar component.
    const updateSearchTerm = (term: string) => {
        setSearchTerm(term);
    }

    useEffect(() => {
        setErrorMessage('')
        // Fetches distinct software names.
        const fetchSoftwareNames = async () => {
            try {
                const data: string[] | undefined = await fetchSoftwareUsedInOrg('available', 'true',  checked ? org as string : '');
                if (data !== undefined) {
                    setOrgSoftware(data);
                }
            } catch (error) {
                console.error('Error fetching software names:', error);
            }
        };
        fetchSoftwareNames();
    }, [checked]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const {
                    results,
                    count,
                    error,
                    message
                } = await fetchPoolData(currentPage, searchTerm, checked ? org as string : undefined);
                if (error) {
                    setErrorMessage(message);
                    setData([]);
                } else {
                    setData(results);
                    setCount(count);
                }
            } catch (error) {
                console.error('Error fetching license data:', error);
            }
        };

        fetchData();
    }, [currentPage, checked, searchTerm]);


    return (
        <div>
            <Grid sx={{paddingTop: 5, paddingLeft: 25}}>
                <ActiveLastBreadcrumb/>
            </Grid>
            <Box id={'licensepool_container'}
                 style={{display: 'flex', justifyContent: 'center', alignContent: "center", marginTop: "20px"}}>
                <Grid container className='license_pool' justifyContent={"center"}>
                    <Grid container justifyContent="center" alignItems="center" className={'license_table'}
                          width={"75%"}>
                        <Stack direction={"column"} spacing={1} width={"95%"} marginBottom={"10px"}>
                            <h2 style={{fontFamily: 'Source Sans Pro, sans-serif'}}> Lisensportalen</h2>
                            <h4 style={{
                                fontFamily: 'Source Sans Pro, sans-serif',
                                fontStyle: "italic",
                                fontWeight: 200,
                                marginTop: "-1%"
                            }}>-Velg miljøvennlig!</h4>
                        </Stack>
                        <Stack direction={'row'} spacing={5} width={"95%"} marginBottom={"30px"} alignItems="center"
                               marginTop={"10px"}>
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
                        <Stack direction={'column'} width={"100%"}>
                            <PoolTable data={data}/>
                            <Pagination
                                count={Math.ceil(count / ITEMS_PER_PAGE)}
                                page={currentPage}
                                onChange={handlePageChange}
                                variant="outlined"
                                shape="rounded"
                                size="small"
                                style={{marginTop: '1rem'}}
                            />

                        </Stack>

                    </Grid>
                </Grid>
            </Box>
        </div>
    );


}

export default LicensePool;