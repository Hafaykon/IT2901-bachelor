import {Grid} from '@mui/material';
import React, {useEffect, useState} from 'react';
import ActiveLastBreadcrumb from '../components/ActivateLastBreadcrumb';
import PoolRequestUnitHeadList from "../components/dashboard/PoolRequestUnitHeadList";
import {useRecoilValue} from "recoil";
import {userAtom} from "../globalVariables/variables";
import PoolRequestUserList from "../components/dashboard/PoolRequestUserList";
import {OrgRequest} from "../Interfaces";

interface RequestObject {
    own_requests: OrgRequest[]; // An array of objects representing own requests
    org_requests: OrgRequest[]; // An array of objects representing organization requests
}


function MyPage() {
    const accessToken = localStorage.getItem('access');
    const [poolRequests, setPoolRequests] = useState<RequestObject>({own_requests: [], org_requests: []});
    const userInfo = useRecoilValue(userAtom)

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
        <div>
            <Grid sx={{paddingTop: 5, paddingLeft: 25}}>
                <ActiveLastBreadcrumb/>
            </Grid>
            <Grid container>
                <>
                    {userInfo.is_unit_head &&
                        <PoolRequestUnitHeadList poolRequests={poolRequests.org_requests} onApprove={handleApprove}
                                                 onDisapprove={handleDisapprove} isOwnRequest={false}/>}
                    <PoolRequestUserList userRequests={poolRequests.own_requests}/>
                </>
            </Grid>
        </div>
    );
}

export default MyPage;
