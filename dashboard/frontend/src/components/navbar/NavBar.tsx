import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import trondheimLogo from '../assets/images/trondheimLogo.png';
import './NavBar.css';
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import { SidebarData } from './SideBar';



function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    
    <Grid id="navBar">
      <Grid id="logoTrondheim">
        <img src={trondheimLogo} alt="logo" />
      </Grid>
      <Grid id="menuIcon">
        <Link to="#" className='menu-bars'>
        <MenuIcon sx={{ fontSize: 50}} onClick={showSidebar} style={{color: '#302d2d'}}/> 
        </Link>
      </Grid>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <ClearIcon sx={{ fontSize:40}} style={{color: '#302d2d'}}/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            
          </ul>
        </nav>

    
    </Grid>
  );
}

export default Navbar;
