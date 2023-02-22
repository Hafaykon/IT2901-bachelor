import React from 'react';
import './App.css';
//import InfoBox from './components/dashboard/InfoBox';
//import { Stack } from '@mui/material';
//Test
import {Route, Routes } from 'react-router-dom';
import LicenseInfo from './components/LicenseInfo';
import Overview from './components/Overview';

function App() {
  return (

    <><div className={'App'}>
          <Routes>
            <Route path="/" element={<Overview />}/>
            <Route path="/licenses/:title" element={<LicenseInfo />} />
          </Routes>
    </div></>

  );
}


export default App;
