import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import {useRecoilValue} from "recoil";
import {userAtom} from "../../globalVariables/variables";

type ReserveButtonProps = {
    id: number;
    application_name: string;

}
const BuyButton: React.FC<ReserveButtonProps> = ({id, application_name}) => {
    const accessToken = localStorage.getItem('access');
    const userInfo = useRecoilValue(userAtom)
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
        }
    }

    return (
        <IconButton onClick={handleClick} color="primary" aria-label="add to shopping cart">
            <AddShoppingCartIcon/>
        </IconButton>
    );

}
export default BuyButton;