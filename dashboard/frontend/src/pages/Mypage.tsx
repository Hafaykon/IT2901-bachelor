import {
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  Container
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ActiveLastBreadcrumb from '../components/ActivateLastBreadcrumb';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../globalVariables/variables';
import PoolRequestUserList from '../components/dashboard/PoolRequestUserList';
import { Count, OrgRequest } from '../Interfaces';
import { fetchInfoBoxData } from '../api/calls';
import DonutChart from '../components/dashboard/DonutChart';
import PoolRequestList from '../components/dashboard/PoolRequestList';
import MuiLoadingSpinner from '../components/spinner/MuiLoadingSpinner';
import MyPageTable from '../components/mypage/MyPageTable';
import Info from '../components/mypage/Info';
import { IUser } from '../components/mypage/types';
import './MyPage.css';

interface RequestObject {
  own_requests: OrgRequest[];
  org_requests: OrgRequest[];
  history: OrgRequest[];
}

function MyPage() {
  const accessToken = localStorage.getItem('access');
  const [poolRequests, setPoolRequests] = useState<RequestObject>({
    own_requests: [],
    org_requests: [],
    history: []
  });
  const userInfo = useRecoilValue(userAtom);
  const [showHistory, setShowHistory] = useState(false);
  const [boxData, setBoxData] = useState<Count[]>([]);

  const user: IUser = {
    name: 'Emma Blix',
    avatarUrl: 'https://example.com/avatar.jpg'
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch box data
      const boxDataResponse: Count[] | undefined = await fetchInfoBoxData(
        userInfo.organization,
        userInfo.primary_user_email
      );
      if (boxDataResponse !== undefined) {
        setBoxData(boxDataResponse);
      }
    };
    fetchData();
  }, []);
  const handleShowHistory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowHistory(event.target.checked);
  };

  useEffect(() => {
    const fetchPoolRequests = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/requests/get/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setPoolRequests(data);
        console.log(data);
      }
    };
    fetchPoolRequests();
  }, []);

  const handleApprove = async (requestId: number) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/requests/${requestId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          action: 'approve'
        })
      }
    );

    if (response.ok) {
      setPoolRequests((prevState) => {
        const updatedOrgRequests = prevState.org_requests.filter(
          (request) => request.id !== requestId
        );
        return { ...prevState, org_requests: updatedOrgRequests };
      });
    } else {
      console.log(response);
    }
  };

  const handleDisapprove = async (requestId: number) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/requests/${requestId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          action: 'disapprove'
        })
      }
    );

    if (response.ok) {
      setPoolRequests((prevState) => {
        const updatedOrgRequests = prevState.org_requests.filter(
          (request) => request.id !== requestId
        );
        return { ...prevState, org_requests: updatedOrgRequests };
      });
    } else {
      // Handle the error, if needed
    }
  };

  return (
    <>
      {boxData.length > 0 ? (
        <Container>
          <Grid sx={{ paddingTop: 5, paddingLeft: 25 }}>
            <ActiveLastBreadcrumb />
          </Grid>

          <Box sx={{ padding: 2 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <h2 style={{ textAlign: 'center' }}>
                  {userInfo.primary_user_full_name}
                </h2>
              </Grid>
              <Grid item xs={12}>
                <div className="centered">
                  <Info name={user.name} avatarUrl={user.avatarUrl} />
                </div>
              </Grid>
              <Grid id="donutChartMyPage" item xs={12} sm={6}>
                <DonutChart
                  never_used={boxData[0].never_used}
                  total_licenses={boxData[0].total_licenses}
                  unused_licenses={boxData[0].unused_licenses}
                  active_licenses={boxData[0].active_licenses}
                  available_licenses={boxData[0].available_licenses}
                  width={500}
                  height={420}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyPageTable />
              </Grid>
              <Grid item xs={12}>
                {userInfo.is_unit_head ? (
                  <>
                    <h2 style={{ textAlign: 'center' }}>
                      Aktive forespørsler (må godkjennes)
                    </h2>
                    <PoolRequestList
                      poolRequests={poolRequests.org_requests}
                      onApprove={handleApprove}
                      onDisapprove={handleDisapprove}
                      isOwnRequest={false}
                      isHistory={false}
                    />
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={showHistory}
                              onChange={handleShowHistory}
                              color="primary"
                            />
                          }
                          label="Vis historikk"
                        />
                      </Grid>
                      {showHistory && (
                        <Grid item>
                          <h2 style={{ textAlign: 'center' }}>Historikk</h2>
                          <PoolRequestList
                            poolRequests={poolRequests.history}
                            onApprove={handleApprove}
                            onDisapprove={handleDisapprove}
                            isOwnRequest={false}
                            isHistory={true}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </>
                ) : (
                  <Box>
                    <Box
                      sx={{
                        marginTop: 4,
                        marginBottom: 2,
                        backgroundColor: 'rgb(245, 245, 245)',
                        borderRadius: '4px'
                      }}>
                      <h2 style={{ textAlign: 'center' }}>
                        Aktive forespørsler (må godkjennes)
                      </h2>
                      <PoolRequestUserList
                        userRequests={poolRequests.own_requests}
                        isHistory={false}
                      />
                    </Box>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={showHistory}
                              onChange={handleShowHistory}
                              color="primary"
                            />
                          }
                          label="Vis historikk"
                          sx={{ width: '150px' }}
                        />
                      </Grid>
                      {showHistory && (
                        <Grid item>
                          <Box>
                            <h2 style={{ textAlign: 'center' }}>Historikk</h2>
                            <PoolRequestList
                              poolRequests={poolRequests.history}
                              onApprove={handleApprove}
                              onDisapprove={handleDisapprove}
                              isOwnRequest={false}
                              isHistory={true}
                            />
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
      ) : (
        <MuiLoadingSpinner />
      )}
    </>
  );
}

export default MyPage;
