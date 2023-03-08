import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';

type ReserveButtonProps = {
    id: number;
    full_name: string;

}
const ReserveButton: React.FC<ReserveButtonProps> = ({id, full_name}) => {
    console.log(id, full_name);
    const handleClick = () => {
        console.log('clicked');

    }
    return (
        <IconButton onClick={handleClick} color="primary" aria-label="add to shopping cart">
            <AddShoppingCartIcon/>
        </IconButton>
    );

}
export default ReserveButton;