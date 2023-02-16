import React from 'react';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import trondheimLogo from '../assets/images/trondheimLogo.png';
import './NavBar.css';

function Navbar() {
  return (
    <Grid id="navBar">
      <Grid id="logoTrondheim">
        <img src={trondheimLogo} alt="logo" />
      </Grid>
      <Grid id="menuIcon">
        <MenuIcon sx={{ fontSize: 30 }}/>
      </Grid>
    </Grid>
  );
}

export default Navbar;
