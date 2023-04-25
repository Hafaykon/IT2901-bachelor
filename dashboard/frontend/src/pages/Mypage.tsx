import {Box, Checkbox, FormControlLabel, Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import ActiveLastBreadcrumb from "../components/dashboard/ActivateLastBreadcrumb";
import {useRecoilValue} from "recoil";
import {userAtom} from "../globalVariables/variables";
import {Count, OrgRequest} from "../Interfaces";
import {fetchInfoBoxData} from "../api/calls";
import DonutChart from "../components/dashboard/DonutChart";
import PoolRequestList from "../components/dashboard/PoolRequestList";
import MuiLoadingSpinner from "../components/spinner/MuiLoadingSpinner";

interface RequestObject {
    own_requests: OrgRequest[];
    org_requests: OrgRequest[];
    history: OrgRequest[];
}


function MyPage() {
    const accessToken = localStorage.getItem('access');
    const [poolRequests, setPoolRequests] = useState<RequestObject>({own_requests: [], org_requests: [], history: []});
    const userInfo = useRecoilValue(userAtom)
    const [showHistory, setShowHistory] = useState(false);
    const [boxData, setBoxData] = useState<Count[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            // Fetch box data
            const boxDataResponse: Count[] | undefined = await fetchInfoBoxData(userInfo.organization, userInfo.primary_user_email);
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
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setPoolRequests(data);
                console.log(data)
            }
        };
        fetchPoolRequests();
    }, []);

    const handleApprove = async (requestId: number) => {
        const response = await fetch(`http://127.0.0.1:8000/api/requests/${requestId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                action: 'approve'
            })
        });

        if (response.ok) {
            setPoolRequests((prevState) => {
                const updatedOrgRequests = prevState.org_requests.filter(
                    (request) => request.id !== requestId
                );
                return {...prevState, org_requests: updatedOrgRequests};
            });
        } else {
            console.log(response)
        }
    };

    const handleDisapprove = async (requestId: number) => {
        const response = await fetch(`http://127.0.0.1:8000/api/requests/${requestId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                action: 'disapprove'
            })
        });

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
            {boxData.length > 0 ? (
                <div>
                    <Grid>
                        <ActiveLastBreadcrumb/>
                    </Grid>
                    <Box sx={{padding: 2}}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <h2 style={{textAlign: "center"}}>
                                    Hei {userInfo.primary_user_full_name}
                                </h2>
                            </Grid>
                            <Grid item xs={12}>
                                <DonutChart
                                    never_used={boxData[0].never_used}
                                    total_licenses={boxData[0].total_licenses}
                                    unused_licenses={boxData[0].unused_licenses}
                                    active_licenses={boxData[0].active_licenses}
                                    available_licenses={boxData[0].available_licenses}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {userInfo.is_unit_head ? (
                                    <>
                                        <h2 style={{textAlign: "center"}}>Aktive forespørsler (må godkjennes)</h2>
                                        <PoolRequestList
                                            poolRequests={poolRequests.org_requests}
                                            onApprove={handleApprove}
                                            onDisapprove={handleDisapprove}
                                            isOwnRequest={false}
                                            isHistory={false}
                                        />
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
                                        {showHistory && (
                                            <>
                                                <h2 style={{textAlign: "center"}}>Historikk</h2>
                                                <PoolRequestList
                                                    poolRequests={poolRequests.history}
                                                    onApprove={handleApprove}
                                                    onDisapprove={handleDisapprove}
                                                    isOwnRequest={false}
                                                    isHistory={true}
                                                />
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <Box>
                                        <Box
                                            sx={{
                                                padding: 2,
                                                marginBottom: 2,
                                                backgroundColor: "rgb(245, 245, 245)",
                                                borderRadius: "4px",
                                            }}
                                        >
                                            <h2 style={{textAlign: "center"}}>
                                                Aktive forespørsler (må godkjennes)
                                            </h2>
                                            <PoolRequestList
                                                poolRequests={poolRequests.own_requests}
                                                isOwnRequest={true}
                                                isHistory={false}
                                                onApprove={() => {
                                                    console.log('')
                                                }}
                                                onDisapprove={() => {
                                                    console.log('')
                                                }}
                                            />
                                        </Box>
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
                                        {showHistory && (
                                            <Box
                                                sx={{
                                                    padding: 2,
                                                    marginTop: 2,
                                                    backgroundColor: "rgb(245, 245, 245)",
                                                    borderRadius: "4px",
                                                }}
                                            >
                                                <h2 style={{textAlign: "center"}}>Historikk</h2>
                                                <PoolRequestList
                                                    poolRequests={poolRequests.history}
                                                    isOwnRequest={true}
                                                    isHistory={true}
                                                    onApprove={() => {
                                                        console.log('')
                                                    }}
                                                    onDisapprove={() => {
                                                        console.log('')
                                                    }}
                                                />
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            ) : (
                <MuiLoadingSpinner/>
            )}
        </>
    );


}

export default MyPage;
