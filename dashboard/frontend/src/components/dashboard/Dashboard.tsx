import React from "react";
import {Grid, Stack} from "@mui/material";
import InfoBox from "./InfoBox";
import DonutChart from "./DonutChart";
import {SavingsBox} from "./SavingsBox";
import OrganizationSelector from "../OrganizationSelector";
import SoftwareSearchBar from "../SoftwareSeachBar";

function Dashboard() {
    return (
        <div>
            <Grid container className='boxes'>
                <Grid item>
                    <Stack direction="row" spacing={8}>
                        <InfoBox title="Totale Lisenser" numberOfLicenses={2100}/>
                        <InfoBox title="Ubrukte Lisenser" numberOfLicenses={2000}/>
                        <InfoBox title="Ledige Lisenser" numberOfLicenses={100}/>
                    </Stack>
                </Grid>
                <DonutChart/>
                <Grid item sx={{ml: 8, mt: 7}}>
                    <Stack direction={'column'} spacing={8}>
                        <SavingsBox title="Potensiell Sparing" savings={2000}/>
                        <SavingsBox title="Kroner Spart" savings={400}/>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
}

export default Dashboard;
