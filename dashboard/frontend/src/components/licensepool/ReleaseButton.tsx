import React from 'react';
import {Button} from '@mui/material';

type ReserveButtonProps = {
    id: number;
    full_name: string;

}
const ReleaseButton: React.FC<ReserveButtonProps> = ({id, full_name}) => {
    const handleClick = () => {
        alert("Du har frigjort lisensen til " + full_name);
        console.log(id, full_name);

    }
    return (
        <Button onClick={handleClick} variant="contained" color="success">
            Frigjør lisens
        </Button>
    );

}
export default ReleaseButton;