import React from 'react';
import './App.css';
import InfoBox from './components/dashboard/InfoBox';
import MyPage from './components/mypage/MyPage';
import FAQ from './components/faq/FAQ';
import LicensePool from './components/licensepool/LicensePool';
import { Stack } from '@mui/material';
import Navbar from './components/navbar/NavBar';
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes
} from 'react-router-dom';
import NavBar from './components/navbar/NavBar';

function App() {
  return (
    <>
      <div className={'App'}>
      <Routes>
         <Route path='/' element={<NavBar/>}>
          <Route path={"/minside"} element={<MyPage />} />
          <Route path="/lisensportal" element={<LicensePool />} />
          <Route path="/FAQ" element={<FAQ />} />
        </Route>
      </Routes>
      </div>  
    </>
  );
}

export default App;
