import React from 'react';
import './App.css';
import {RecoilRoot} from 'recoil';
import {Route, Routes} from 'react-router-dom';
import MyPage from './pages/Mypage';
import LicenseInfo from './components/LicenseInfo';
import FAQ from './pages/FAQ';
import Home from './pages/Home';
import Navbar from './components/navbar/Navbar';
import Licenses from './pages/Licenses';
import { Leaderboard } from './components/leaderboard/Leaderboard';

function App() {

    return (
        <RecoilRoot>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/minside" element={<MyPage/>}/>
                <Route path="/:title" element={<LicenseInfo/>}/>
                <Route path="/lisensportal" element={<Licenses/>}/>
                <Route path="/FAQ" element={<FAQ/>}/>
                <Route path='/leaderboard' element={<Leaderboard/>}/>
            </Routes>
        </RecoilRoot>
    );
}


export default App;
