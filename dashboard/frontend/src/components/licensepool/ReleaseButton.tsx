import React from 'react';
import {Button} from '@mui/material';

type ReserveButtonProps = {
    id: number;
    primary_user_email: string;
    application_name: string;
    organization: string;

}
const ReleaseButton: React.FC<ReserveButtonProps> = ({id, primary_user_email, application_name, organization}) => {
    const accessToken = localStorage.getItem('access');
    const handleClick = async () => {
        const data = await releaseLicense();
        if (data) {
            alert('Lisensen er frigjort')
        }


    }

    const releaseLicense = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/pool_req/create', {
            method: 'POST', // Change this from 'GET' to 'POST'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                'contact_organization': organization,
                'application_name': application_name,
                'request': 'add',
                'requested_by': primary_user_email,
                'spc_id': id,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data);
            return data;
        }
    }


    return (
        <Button onClick={handleClick} variant="contained" color="success">
            Frigjør lisens
        </Button>
    );

}
export default ReleaseButton;