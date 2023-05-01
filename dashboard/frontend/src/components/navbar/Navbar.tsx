import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import trondheimLogo from '../../assets/trondheimLogo.png';
import './Navbar.css';
import {NavLink} from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import {SidebarData} from './Sidebar';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <nav data-testid="navbar">
            <Grid id="navBar">
                <Grid id="logoTrondheim">
                    <NavLink to="/" className="logo">
                        <img src={trondheimLogo} alt="logo"/>
                    </NavLink>
                </Grid>
                <Grid id="menuIcon">
                    <NavLink to="#" className="menu-bars">
                        <MenuIcon
                            data-testid="menuIcon"
                            sx={{fontSize: 50}}
                            onClick={showSidebar}
                            style={{color: '#302d2d'}}
                        />
                    </NavLink>
                </Grid>
                <nav
                    data-testid="sidebar"
                    className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <NavLink to="#" className="menu-bars">
                                <ClearIcon
                                    data-testid="clearIcon"
                                    sx={{fontSize: 40}}
                                    style={{color: '#302d2d'}}
                                />
                            </NavLink>
                        </li>

                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <NavLink to={item.path} onClick={item.onClick}>
                                        <span id="spanning">{item.title}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </Grid>
        </nav>
    );
}

export default Navbar;