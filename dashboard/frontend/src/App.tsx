import React from 'react';
import './App.css';
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
