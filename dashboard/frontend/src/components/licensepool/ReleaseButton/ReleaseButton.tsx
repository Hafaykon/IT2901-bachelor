import React from 'react';
import {Button} from '@mui/material';
import {useRecoilValue, useSetRecoilState} from "recoil";
import {refreshTableAtom, userAtom} from "../../../globalVariables/variables";

type ReserveButtonProps = {
    spc_id: number;
    primary_user_email: string;
    application_name: string;
    organization: string;
    price: number;

}
const ReleaseButton: React.FC<ReserveButtonProps> = ({spc_id, primary_user_email, application_name, organization, price}) => {
    const accessToken = localStorage.getItem('access');
    const userInfo = useRecoilValue((userAtom))
    const isUnitHead = userInfo.is_unit_head;
    const setRefresh = useSetRecoilState(refreshTableAtom)


    const handleClick = async () => {
        if (!isUnitHead) {
            const data = await requestFreeOwnLicense();
            if (data) {
                alert('Forespørsel sendt sendt til lisensansvarlig!')
            }
        } else {
            const data = await freeLicense();
            if (data) {
                alert('Lisens frigjort!')
            }

        }
    }

    const requestFreeOwnLicense = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/requests/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                'contact_organization': organization,
                'application_name': application_name,
                'request': 'add',
                'requested_by': primary_user_email,
                'price': price,
                'spc_id': spc_id,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            alert(data.non_field_errors[0])
        }
    }


    const freeLicense = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/pool/create', {
            method: 'POST', // Change this from 'GET' to 'POST'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                'freed_by_organization': organization,
                'application_name': application_name,
                'price': price,
                'spc_id': spc_id,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            setRefresh((old) => !old)
            return data;
        } else {
            alert(data.non_field_errors[0])
        }

    }


    return (
        <Button onClick={handleClick} variant="contained" sx={{backgroundColor: '#00953b'}}>
            {isUnitHead ? 'Legg i lisensportalen' : 'Send forespørsel'}
        </Button>
    );

}
export default ReleaseButton;