import React from 'react';
import './App.css';
import MyPage from './components/mypage/MyPage';
import FAQ from './components/faq/FAQ';
import LicensePool from './components/licensepool/LicensePool';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/navbar/NavBar';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div className={'App'}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/minside" element={<MyPage />} />
          <Route path="/lisensportal" element={<LicensePool />} />
          <Route path="/FAQ" element={<FAQ />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
