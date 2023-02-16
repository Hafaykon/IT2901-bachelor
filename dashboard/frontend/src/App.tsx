import React from 'react';
import './App.css';
import InfoBox from './components/dashboard/InfoBox';
import { Stack } from '@mui/material';
import SoftwareSearchBar from './components/dashboard/SoftwareSeachBar';

function App() {
  return (
    <>
      <div className={'App'}>
        <SoftwareSearchBar/>
      </div>
    </>

  );
}


export default App;
