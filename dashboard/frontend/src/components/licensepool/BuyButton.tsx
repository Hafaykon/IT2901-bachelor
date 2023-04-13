import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import {useRecoilValue, useSetRecoilState} from "recoil";
import {refreshTableAtom, userAtom} from "../../globalVariables/variables";

type ReserveButtonProps = {
    id: number;
    application_name: string;
}

const BuyButton: React.FC<ReserveButtonProps> = ({id, application_name}) => {
    const accessToken = localStorage.getItem('access');
    const userInfo = useRecoilValue(userAtom)
    const isUnitHead = userInfo.is_unit_head;
    const setRefresh = useSetRecoilState(refreshTableAtom)

    const handleClick = async () => {
        const action = isUnitHead ? releaseLicense : requestReleaseLicense;
        const data = await action();

        if (data) {
            const message = isUnitHead ? 'Lisens frigjort!' : 'Forespørsel sendt sendt til lisensansvarlig!';
            alert(message);
        }
    };


    const requestReleaseLicense = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/requests/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                'contact_organization': userInfo.organization,
                'application_name': application_name,
                'request': 'remove',
                'requested_by': userInfo.primary_user_email,
                'spc_id': id,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data);
            return data;
        } else {
            alert(data.non_field_errors[0])
        }
    }

    const releaseLicense = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/pool/buy/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                'spc_id': id,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            setRefresh((old) => !old)
            return data;
        } else {
            alert(data.error)
        }
    }

    return (
        <IconButton onClick={handleClick} color="primary" aria-label="add to shopping cart">
            <AddShoppingCartIcon/>
        </IconButton>
    );
}

export default BuyButton;
