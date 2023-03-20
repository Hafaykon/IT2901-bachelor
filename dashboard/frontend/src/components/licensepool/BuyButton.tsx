import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';

type ReserveButtonProps = {
    id: number;
    full_name: string;

}
const BuyButton: React.FC<ReserveButtonProps> = ({id, full_name}) => {
    console.log(id, full_name);
    const handleClick = () => {
        alert("Du har kjøpt lisensen til " + full_name);

    }
    return (
        <IconButton onClick={handleClick} color="primary" aria-label="add to shopping cart">
            <AddShoppingCartIcon/>
        </IconButton>
    );

}
export default BuyButton;