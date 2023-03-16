import React, {useEffect, useState} from 'react';
import './Dashboard.css';
import {Grid, Stack} from '@mui/material';
import InfoBox from './InfoBox';
import DonutChart from './DonutChart';
import {SavingsBox} from './SavingsBox';
import {useRecoilValue} from 'recoil';
import {orgAtom} from '../../globalVariables/variables';
import {fetchInfoBoxData} from '../../api/calls';
import CircularIndeterminate from '../spinner/MuiLoadingSpinner';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

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
                <div id="body">
                    <Grid container id='boxes'>
                        <Grid container className={'org_info'} justifyContent={"flex-end"} alignContent={"flex-end"}>
                            <Stack direction="row">
                                <a href="/lisensportal" id="portal-link">

                                    Til lisensportalen
                                    <LogoutOutlinedIcon style={{alignContent: "center"}}/>
                                </a>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Stack direction="row" spacing={8}>
                                <InfoBox
                                    title="Totale Lisenser"
                                    numberOfLicenses={boxData[0]?.total_licenses ?? 0}
                                />
                                <InfoBox
                                    title="Uåpnede Lisenser"
                                    numberOfLicenses={boxData[0]?.never_used ?? 0}
                                />
                                <InfoBox
                                    title="Ledige Lisenser"
                                    numberOfLicenses={boxData[0]?.unused_licenses ?? 0}
                                />
                            </Stack>
                        </Grid>
                        <Grid container id={'donut_chart'}>
                            <DonutChart never_used={boxData[0].never_used} total_licenses={boxData[0].total_licenses}
                                        unused_licenses={boxData[0].unused_licenses}
                                        active_licenses={boxData[0].active_licenses}/>
                            <Grid item sx={{ml: 8, mt: 7}}>
                                <Stack direction={'column'} spacing={8}>
                                    <SavingsBox title="Potensiell Sparing" savings={2000}/>
                                    <SavingsBox title="Kroner Spart" savings={3000}/>
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
