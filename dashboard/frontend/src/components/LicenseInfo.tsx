import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {fetchInfoBoxLicense, fetchPoolData, fetchSoftwareUsedInOrg} from '../api/calls';
import SoftwareSearchBar from './search/SoftwareSeachBar';
import {LicensePoolData, OwnOrgData} from "../Interfaces";
import {Grid, Stack} from '@mui/material';
import OwnTable from "./licensepool/OwnTable";
import Pagination from '@mui/material/Pagination';
import PoolTable from "./licensepool/PoolTable";

const LicenseInfo: React.FC = () => {
    const storedOrganization: string | null = JSON.parse(localStorage.getItem('organization') ?? 'null');
    const {title} = useParams();

    const [data, setData] = useState<OwnOrgData[] & LicensePoolData[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>();
    const [orgSoftware, setOrgSoftware] = useState<string[]>([]);
    const [status, setStatus] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [count, setCount] = useState<number>(0);
    const location = useLocation();


    useEffect(() => {
        switch (title) {
            case 'Totale Lisenser':
                setStatus('active')
                break;
            case 'Uåpnede Lisenser':
                setStatus('unused')
                break;
            case 'Ledige Lisenser':
                setStatus('available')
                break;
            default:
                setStatus(null);
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
                    if (status !== 'available') {
                        const data = await fetchInfoBoxLicense(currentPage, status as string, storedOrganization as string, searchTerm);
                        data?.results && setData(data.results);
                        data?.count && setCount(data.count);
                    } else if (status === 'available') {
                        const data = await fetchPoolData(currentPage, searchTerm, storedOrganization as string);
                        data?.results && setData(data.results);
                    }
                } catch (error) {
                    console.error('Error fetching license data:', error);
                }
            }
        };
        fetchData();
    }, [searchTerm, currentPage, status]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const appName = searchParams.get('search');
        console.log(appName);
        if (appName) {
            setSearchTerm(appName);
        }
    }, [location.search]);

    // Function that gets input from the searchBar component.
    const handleChange = (term: string) => {
        setSearchTerm(term);
    }

    const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <div id={'licensepool_container'}
             style={{display: 'flex', justifyContent: 'center', alignContent: "center", marginTop: "20px"}}>
            <Grid container className='license_pool' justifyContent={"center"}>
                <Grid container justifyContent="center" alignItems="center" className={'license_table'} width={"75%"}>
                    <Stack direction={"column"} spacing={1} width={"70%"} marginBottom={"10px"}>
                        <h2 style={{fontFamily: "Source Sans 3"}}> {title} i {storedOrganization}</h2>
                        <SoftwareSearchBar data={orgSoftware} setSelectedSoftware={handleChange}/>
                        {status === 'available' ? <PoolTable data={data}/> : <OwnTable data={data}/>}
                        <Pagination
                            count={Math.ceil(count / 10)}
                            page={currentPage}
                            onChange={
                                handlePageChange
                            }
                            color={"primary"}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </div>)
};

export default LicenseInfo;