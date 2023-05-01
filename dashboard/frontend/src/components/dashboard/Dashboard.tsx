import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Grid, Stack, Typography } from '@mui/material';
import InfoBox from './InfoBox';
import DonutChart from './DonutChart';
import ActiveLastBreadcrumb from './ActivateLastBreadcrumb';
import { LeaderboardBox } from './LeaderboardBox';
import { useRecoilValue } from 'recoil';
import { orgAtom } from '../../globalVariables/variables';
import { fetchInfoBoxData } from '../../api/calls';
import MuiLoadingSpinner from '../spinner/MuiLoadingSpinner';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { SavingsBox } from './SavingsBox';
import { Link } from 'react-router-dom';
import { Count } from '../../Interfaces';

function Dashboard() {
  // Retrieve organization name from global state
  const org = useRecoilValue(orgAtom);

  // Define state variables for box data and access token
  const [boxData, setBoxData] = useState<Count[] | undefined>(undefined);
  const accessToken = localStorage.getItem('access');

  // Fetch data from API when component mounts or access token/organization changes
  useEffect(() => {
    const fetchData = async () => {
      if (accessToken && org) {
        // Fetch box data
        const boxDataResponse: Count[] | undefined = await fetchInfoBoxData(
          org
        );
        if (boxDataResponse !== undefined) {
          setBoxData(boxDataResponse);
        }
      }
    };

    fetchData();
  }, [accessToken, org]);

  return (
    <>
      {boxData ? ( // If box data has been fetched
        <div className={'body'}>
          <Grid container id="header">
            <Stack spacing={2}>
              <Grid item sx={{ marginLeft: -21, marginTop: -5 }}>
                <ActiveLastBreadcrumb />
              </Grid>
              <Grid container>
                <Stack direction="row">
                  <Typography id="org_name">{org}</Typography>
                  <Stack direction="row">
                    <Link to="/lisensportal" id="portal-link">
                      Til lisensportalen
                      <LogoutOutlinedIcon style={{ alignContent: 'center' }} />
                    </Link>
                  </Stack>
                </Stack>
              </Grid>
            </Stack>
          </Grid>
          <Grid container id="boxes">
            <Grid item>
              <Stack direction="row" spacing={8}>
                {/* Display info boxes with data */}
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
              {/* Display donut chart with data */}
              <DonutChart
                never_used={boxData[0].never_used}
                total_licenses={boxData[0].total_licenses}
                unused_licenses={boxData[0].unused_licenses}
                active_licenses={boxData[0].active_licenses}
                available_licenses={boxData[0].available_licenses}
                width={670}
                height={425}
                showInformation={true}
                title='Total oversikt'
              />
              {/* Stack component containing SavingsBox and LeaderboardBox */}
              <Grid item sx={{ ml: 8, mt: 7 }}>
                <Stack direction={'column'} spacing={4.38}>
                  <SavingsBox />
                  <LeaderboardBox />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ) : (
        <MuiLoadingSpinner />
      )}
    </>
  );
}

export default Dashboard;
