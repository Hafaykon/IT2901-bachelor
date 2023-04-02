import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchInfoBoxLicense, fetchSoftwareUsedInOrg} from '../api/calls';
import SoftwareSearchBar from './search/SoftwareSeachBar';
import {OwnOrgData} from "../Interfaces";
import {Box, Grid, Stack} from '@mui/material';
import OwnTable from "./licensepool/OwnTable";
import Pagination from '@mui/material/Pagination';
import ActiveLastBreadcrumb from './ActivateLastBreadcrumb';
import CircularIndeterminate from './spinner/MuiLoadingSpinner';

const LicenseInfo: React.FC = () => {
    const storedOrganization: string | null = JSON.parse(localStorage.getItem('organization') ?? 'null');
    const {title} = useParams();
    const [data, setData] = useState<OwnOrgData[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>();
    const [orgSoftware, setOrgSoftware] = useState<string[]>([]);
    const [status, setStatus] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [count, setCount] = useState<number>(0);
    const [sortBy, setSortBy] = useState<string>('application_name')
    const [loaded, setLoaded] = React.useState(false);


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
                setStatus(null);
                break;
        }
        // Fetches distinct software names.
        const fetchSoftwareNames = async () => {
            if (status && storedOrganization) {
                try {
                    const data: string[] | undefined = await fetchSoftwareUsedInOrg(status, 'false', storedOrganization);
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
       fetchData();
    }, [searchTerm, currentPage, status, sortBy]);


    const fetchData = async () => {
        if (status && storedOrganization) {
            console.log(status)
            try {
                const data = await fetchInfoBoxLicense(currentPage, status as string,
                    sortBy as string, storedOrganization as string, searchTerm);
                data?.results && setData(data.results);
                data?.count && setCount(data.count);
                setLoaded(true);
            } catch (error) {
                console.error('Error fetching license data:', error);
            }
        }
    };

    // Function that gets input from the searchBar component.
    const handleChange = (term: string) => {
        setSearchTerm(term);
    }

    const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setLoaded(false)
        setCurrentPage(value);
    };

    const handleSorting = async (sortBy: string) => {
        setLoaded(false)
        setSortBy(sortBy);
        fetchData()
    };


    return (
        <><div>
            <Grid sx={{paddingTop: 5, paddingLeft: 25}}>
                <ActiveLastBreadcrumb />
            </Grid>
            {loaded ? (<Box id={'licensepool_container'}
             style={{display: 'flex', justifyContent: 'center', alignContent: "center", marginTop: "20px"}}>
            <Grid container className='license_pool' justifyContent={"center"}>
                <Grid container justifyContent="center" alignItems="center" className={'license_table'} width={"75%"}>
                    <Stack direction={"column"} spacing={1} width={"70%"} marginBottom={"10px"}>
                        <h2 style={{fontFamily: "Source Sans 3"}}> {title} i {storedOrganization}</h2>
                        <SoftwareSearchBar data={orgSoftware} setSelectedSoftware={handleChange}/>
                        <OwnTable data={data} handleSorting={handleSorting}/>
                        <Pagination
                            count={Math.ceil(count / 10)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color={"primary"}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </Box> ) : (<CircularIndeterminate/>) }
        </div></>)
};

export default LicenseInfo;