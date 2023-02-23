import React from 'react';
import './App.css';
import {RecoilRoot} from 'recoil';
import Dashboard from "./components/dashboard/Dashboard";
import {Route, Routes} from 'react-router-dom';
import MyPage from "./pages/MyPage";
import FAQPage from "./pages/FAQPage";
import LicensePool from "./components/licensepool/LicensePool";
import NavBar from "./components/navigation/NavBar";
function App() {
    return (
        <RecoilRoot>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/minside" element={<MyPage/>}/>
                <Route path="/lisensportal" element={<LicensePool/>}/>
                <Route path="/FAQ" element={<FAQPage/>}/>
            </Routes>
        </RecoilRoot>
    );
}


export default App;
