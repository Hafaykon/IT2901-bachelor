import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchInfoBoxLicense, fetchSoftwareUsedInOrg} from '../api/calls';
import SoftwareSearchBar from './search/SoftwareSeachBar';
import {OwnOrgData} from "../Interfaces";
import {Box, Grid, Stack} from '@mui/material';
import OwnTable from "./licensepool/OwnTable";
import { Pagination } from 'antd';
import ActiveLastBreadcrumb from './ActivateLastBreadcrumb';

const LicenseInfo: React.FC = () => {
    const storedOrganization: string | null = JSON.parse(localStorage.getItem('organization') ?? 'null');
    const {title} = useParams();
    const [data, setData] = useState<OwnOrgData[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>();
    const [orgSoftware, setOrgSoftware] = useState<string[]>([]);
    const [status, setStatus] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        switch (title) {
            case 'Totale Lisenser':
                setStatus('active')
                break;
            case 'Ubrukte Lisenser':
                setStatus('unused')
                break;
            case 'Ledige Lisenser':
                setStatus('available')
                break;
            default:
                break;
        }
        // Fetches distinct software names.
        const fetchSoftwareNames = async () => {
            if (status && storedOrganization) {
                try {
                    const data: string[] | undefined = await fetchSoftwareUsedInOrg(status, storedOrganization);
                    if (data !== undefined) {
                        setOrgSoftware(data);
                    }
                } catch (error) {
                    console.error('Error fetching software names:', error);
                }
            }
        };

        fetchSoftwareNames();
    }, [status]);


    useEffect(() => {
        const fetchData = async () => {
            if (status && storedOrganization) {
                try {
                    const data = await fetchInfoBoxLicense(currentPage, status as string, storedOrganization as string, searchTerm);
                    data?.results && setData(data.results);
                    data?.count && setCount(data.count);
                } catch (error) {
                    console.error('Error fetching license data:', error);
                }
            }

        };
        fetchData()

    }, [searchTerm])

    // Function that gets input from the searchBar component.
    const handleChange = (term: string) => {
        setSearchTerm(term);
    }

  const handlePageChange = async (page: number) => {
  try {
    const data = await fetchInfoBoxLicense(page, status as string, storedOrganization as string, searchTerm);
    data?.results && setData(data.results);
    setCurrentPage(page);
  } catch (error) {
    console.log(error);
  }
};

    return (
        <div>
            <Grid sx={{paddingTop: 5, paddingLeft: 25}}>
                <ActiveLastBreadcrumb />
            </Grid>
        <Box id={'licensepool_container'} style={{display: 'flex', justifyContent: 'center', marginTop: "20px"}}>
            <Grid container className='license_pool'>
                <Grid container className={'license_parameters'}
                      style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: '10px'}}>
                    <Grid item>
                        <Stack direction='column' spacing={5}>
                            <h1 style={{textAlign: "center"}}>{title} i {storedOrganization}</h1>
                            <SoftwareSearchBar data={orgSoftware} setSelectedSoftware={handleChange}/>
                        </Stack>
                    </Grid>
                </Grid>
                <br/>
                <Grid container style={{display: 'flex', justifyContent: 'center', alignItems: "center", width: "100%"}}
                      className={'license_table'}>
                    <OwnTable data={data}/>
                </Grid>
                   <Grid container style={{display: 'flex', justifyContent: 'center', marginTop: "10px"}}>
                    <Pagination
                      current={currentPage}
                      total={count}
                      pageSize={10}
                      onChange={handlePageChange}
                    />
                  </Grid>
            </Grid>
        </Box>
        </div>)
};

export default LicenseInfo;