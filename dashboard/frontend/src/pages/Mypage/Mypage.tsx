import {Box, Checkbox, Container, FormControlLabel, Grid} from '@mui/material';
import React, {useEffect, useState} from 'react';
import ActiveLastBreadcrumb from '../../components/dashboard/ActivateLastBreadcrumb';
import {useRecoilValue} from 'recoil';
import {userAtom} from '../../globalVariables/variables';
import PoolRequestUserList from '../../components/dashboard/PoolRequestUserList';
import {Count, OrgRequest} from '../../Interfaces'
import {fetchInfoBoxData} from '../../api/calls';
import DonutChart from '../../components/dashboard/DonutChart';
import PoolRequestList from '../../components/dashboard/PoolRequestList';
import MuiLoadingSpinner from '../../components/spinner/MuiLoadingSpinner';
import MyPageTable from '../../components/mypage/MyPageTable';
import Info from '../../components/mypage/Info';
import {IUser} from '../../components/mypage/types';
import './MyPage.css';

interface RequestObject {
    own_requests: OrgRequest[];
    org_requests: OrgRequest[];
    history: OrgRequest[];
}

interface Data {
    application_name: string;
    computer_name: string;
    status: string;
}


function MyPage() {
    const userInfo = useRecoilValue(userAtom);
    const [showHistory, setShowHistory] = useState(false);
    const [licenseData, setLicenseData] = useState<Data[]>([]);
    const [boxData, setBoxData] = useState<Count[]>([]);
    const [isBoxDataFetched, setIsBoxDataFetched] = useState<boolean>(false);
    const username = userInfo.primary_user_full_name


    const accessToken = localStorage.getItem('access');
    const [poolRequests, setPoolRequests] = useState<RequestObject>({
        own_requests: [],
        org_requests: [],
        history: []
    });

    const user: IUser = {
        name: 'Bertil Nedregård',
        avatarUrl: 'https://example.com/avatar.jpg'
    };


    useEffect(() => {
        const fetchOwnLicenses = async () => {
            try {
                console.log(accessToken)
                const response = await fetch('http://127.0.0.1:8000/api/licenses/userlicenses/', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setLicenseData(data);
                    console.log(data)
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchOwnLicenses();
    }, [username]);


    useEffect(() => {
        const fetchData = async () => {
            // Fetch box data
            const boxDataResponse: Count[] | undefined = await fetchInfoBoxData(
                userInfo.organization,
                userInfo.primary_user_email
            );
            if (boxDataResponse !== undefined) {
                console.log(boxDataResponse);
                setBoxData(boxDataResponse);

            }
            setIsBoxDataFetched(true);
        };
        fetchData();
    }, []);
    const handleShowHistory = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowHistory(event.target.checked);
    };

    useEffect(() => {
        const fetchPoolRequests = async () => {
            try {
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
                else {
                    console.log(response);
                }
            } catch (error) {
                console.log(error);
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
                return {...prevState, org_requests: updatedOrgRequests};
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
                return {...prevState, org_requests: updatedOrgRequests};
            });
        } else {
            // Handle the error, if needed
        }
    };

    return (
        <>
            {isBoxDataFetched ? (
                <Container>
                    <Grid item sx={{marginLeft: '-10%'}}>
                        <ActiveLastBreadcrumb/>
                    </Grid>
                    <Box sx={{padding: 2}}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sx={{marginLeft: 8}}>
                                <h2 style={{textAlign: 'left'}}>
                                    {userInfo.primary_user_full_name}
                                </h2>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="centered">
                                    <Info name={userInfo.primary_user_full_name} avatarUrl={user.avatarUrl}/>
                                </div>
                            </Grid>
                            {!userInfo.is_unit_head && (
                                <Grid
                                    sx={{
                                        paddingTop: 10,
                                        width: '100%'
                                    }}>
                                    <Grid item sx={{marginLeft: 10}}>
                                        <h2 style={{textAlign: 'left', marginTop: '1rem'}}>
                                            Aktive forespørsler (må godkjennes)
                                        </h2>
                                    </Grid>
                                    <Grid item sx={{width: '109%', marginLeft: '-4%'}}>
                                        <PoolRequestUserList
                                            userRequests={poolRequests.own_requests}
                                            isHistory={false}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            <Grid id="donutChartMyPage" item xs={12} sm={6}>
                                <DonutChart
                                    data-testid="donut-chart"
                                    never_used={boxData[0].never_used ?? 0}
                                    total_licenses={boxData[0].total_licenses ?? 0}
                                    unused_licenses={boxData[0].unused_licenses ?? 0}
                                    active_licenses={boxData[0].active_licenses ?? 0}
                                    available_licenses={boxData[0].available_licenses ?? 0}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MyPageTable  data-testid="table" data={licenseData}/>
                            </Grid>
                            <Grid item xs={10.8}>
                                {userInfo.is_unit_head ? (
                                    <Box>
                                        <h2 style={{textAlign: 'left'}}>
                                            Aktive forespørsler (må godkjennes)
                                        </h2>
                                        <Grid sx={{width: '123%', marginLeft: '-12%'}}>
                                            <PoolRequestList
                                                poolRequests={poolRequests.org_requests}
                                                onApprove={handleApprove}
                                                onDisapprove={handleDisapprove}
                                                isOwnRequest={false}
                                                isHistory={false}
                                            />
                                        </Grid>
                                        <Grid
                                            container
                                            spacing={2}
                                            alignItems="center"
                                            sx={{paddingTop: 3}}>
                                            <Grid item>
                                                <h2 style={{textAlign: 'left'}}>Historikk</h2>
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
                                                <Grid item sx={{width: '123%', marginLeft: '-12%'}}>
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
                                    </Box>
                                ) : (
                                    <Box>
                                        <h2 style={{textAlign: 'left'}}>Historikk</h2>
                                        <Grid container spacing={1} alignItems="left">
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
                                                    sx={{width: '150px'}}
                                                />
                                            </Grid>
                                            {showHistory && (
                                                <Grid item>
                                                    <Box sx={{width: '104%', marginLeft: '-10%'}}>
                                                        <PoolRequestList
                                                            data-testid="request-history"
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
                <MuiLoadingSpinner data-testid="loading-spinner" />
            )}
        </>
    );
}

export default MyPage;
