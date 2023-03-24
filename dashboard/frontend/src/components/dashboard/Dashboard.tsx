import React, {useEffect, useState} from 'react';
import './Dashboard.css';
import {Grid, Stack, Typography} from '@mui/material';
import InfoBox from './InfoBox';
import DonutChart from './DonutChart';
import ActiveLastBreadcrumb from '../ActivateLastBreadcrumb';
import {LeaderboardBox} from './LeaderboardBox';
import {useRecoilValue} from 'recoil';
import {orgAtom} from '../../globalVariables/variables';
import {fetchInfoBoxData} from '../../api/calls';
import CircularIndeterminate from '../spinner/MuiLoadingSpinner';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { SavingsBox } from './SavingsBox';

interface Count {
    total_licenses: number,
    active_licenses: number,
    never_used: number,
    unused_licenses: number

}

function Dashboard() {
    const storedOrganization: string | undefined = JSON.parse(localStorage.getItem('organization') ?? 'null');
    const org = useRecoilValue(orgAtom)
    const [boxData, setBoxData] = useState<Count[] | undefined>(undefined
    );

    useEffect(() => {
        const fetchData = async () => {
            const data: Count[] | undefined = await fetchInfoBoxData(storedOrganization);
            if (data !== undefined) {
                setBoxData(data);
            }
        };
        fetchData();
    }, [org]);


    return (
        <>
            {boxData ? (
                <div className={'body'}>
                    <Grid container id='header'>
                        <Stack spacing={2}>
                            <ActiveLastBreadcrumb />
                            <Grid container>
                                <Stack direction="row">
                                   <Typography className={'org_name'} sx={{fontSize: 30}}>{org}</Typography>
                                   <Stack direction="row">
                                        <a href="/lisensportal" id="portal-link">
                                            Til lisensportalen
                                            <LogoutOutlinedIcon style={{alignContent: "center"}}/>
                                        </a>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Stack>
                    </Grid>
                    <Grid container id="boxes">
                        <Grid item>
                            <Stack direction="row" spacing={8}>
                                <InfoBox
                                    title="Totale Lisenser"
                                    numberOfLicenses={boxData[0]?.total_licenses ?? 0}
                                />
                                <InfoBox
                                    title="Ubrukte Lisenser"
                                    numberOfLicenses={boxData[0]?.never_used ?? 0}
                                />
                                <InfoBox
                                    title="Ledige Lisenser"
                                    numberOfLicenses={boxData[0]?.unused_licenses ?? 0}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container id="boxes">
                        <Grid container id={'donut_chart'}>
                            <DonutChart never_used={boxData[0].never_used} total_licenses={boxData[0].total_licenses}
                                        unused_licenses={boxData[0].unused_licenses}
                                        active_licenses={boxData[0].active_licenses}/>
                            <Grid item sx={{ml: 8, mt: 7}}>
                                <Stack direction={'column'} spacing={8}>
                                    <SavingsBox />
                                    <LeaderboardBox/>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <CircularIndeterminate/>
            )}
        </>
    )
}

export default Dashboard;
