import {Grid} from '@mui/material';
import React, {useEffect, useState} from 'react';
import ActiveLastBreadcrumb from '../components/ActivateLastBreadcrumb';
import {useRecoilValue} from "recoil";
import {userAtom} from "../globalVariables/variables";

function MyPage() {
    const userData = useRecoilValue(userAtom);
    const accessToken = localStorage.getItem('access')
    const [poolRequests, setPoolRequests] = useState([])

    useEffect(() => {
        const fetchPoolRequests = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/pool_req/get/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`

                }
            });
            const data = await response.json()
            if (response.ok) {
                setPoolRequests(data)
                console.log(poolRequests)
            }
        }
        fetchPoolRequests()
    }, [])

    return (
        <div>
            <Grid sx={{paddingTop: 5, paddingLeft: 25}}>
                <ActiveLastBreadcrumb/>
            </Grid>
            <h2>My Page</h2>
            <p>Username: {userData.primary_user_email}</p>
            <p>Organization: {userData.organization}</p>

        </div>
    );
}

export default MyPage;