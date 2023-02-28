import React, {useEffect, useState} from "react";
import './Dashboard.css';
import {Grid, Stack} from "@mui/material";
import InfoBox from "./InfoBox";
import DonutChart from "./DonutChart";
import {SavingsBox} from "./SavingsBox";
import OrganizationSelector from "../OrganizationSelector";
import {useRecoilValue} from "recoil";
import {orgAtom} from "../../globalVariables/variables";
import {fetchInfoBoxData, fetchOrganizations} from "../../api/calls";
import CircularIndeterminate from "../spinner/MuiLoadingSpinner";

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
                        <Grid container className={'org_info'}>
                            <Stack direction="row">
                                <h1 id="organization">{org ?? 'Velg organisasjon'}</h1>
                                <div id="selector">
                                    <OrganizationSelector/>
                                </div>
                            </Stack>
                        </Grid>
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
                        <Grid container id={'donut_chart'}>
                            <DonutChart never_used={boxData[0].never_used} total_licenses={boxData[0].total_licenses}
                                        unused_licenses={boxData[0].unused_licenses}
                                        active_licenses={boxData[0].active_licenses}/>
                            <Grid item sx={{ml: 8, mt: 7}}>
                                <Stack direction={'column'} spacing={8}>
                                    <SavingsBox title="Potensiell Sparing" savings={0}/>
                                    <SavingsBox title="Kroner Spart" savings={0}/>
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
