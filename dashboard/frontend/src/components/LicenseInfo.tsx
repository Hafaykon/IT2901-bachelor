import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchInfoBoxLicense, fetchSoftwareUsedInOrg} from '../api/calls';
import SoftwareSearchBar from './search/SoftwareSeachBar';
import {OwnOrgData} from "../Interfaces";
import {Grid, Stack} from '@mui/material';
import OwnTable from "./licensepool/OwnTable";

const LicenseInfo: React.FC = () => {
    const storedOrganization: string | null = JSON.parse(localStorage.getItem('organization') ?? 'null');
    const {title} = useParams();
    const [data, setData] = useState<OwnOrgData[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>();
    const [orgSoftware, setOrgSoftware] = useState<string[]>([]);
    const [status, setStatus] = useState<string | null>(null);

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
                    const data = await fetchInfoBoxLicense(status as string, storedOrganization as string, searchTerm);
                    data && setData(data);
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

    return (
        <div id={'licensepool_container'} style={{display: 'flex', justifyContent: 'center', marginTop: "20px"}}>
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
            </Grid>
        </div>)
};

export default LicenseInfo;