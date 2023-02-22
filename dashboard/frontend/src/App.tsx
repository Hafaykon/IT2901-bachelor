import React from 'react';
import './App.css';
import InfoBox from './components/dashboard/InfoBox';
import { Stack } from '@mui/material';
import OrganizationSelector from './components/OrganizationSelector';
import SoftwareSearchBar from './components/SoftwareSeachBar';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <>
        <div className={'App'}>
          <OrganizationSelector />
          <SoftwareSearchBar />
        </div>
      </>
    </RecoilRoot>

  );
}


export default App;
