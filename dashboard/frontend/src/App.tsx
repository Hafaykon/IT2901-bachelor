import React from 'react';
import './App.css';
import {RecoilRoot} from 'recoil';
import {Route, Routes} from 'react-router-dom';
import MyPage from './pages/Mypage';
import FAQ from './pages/FAQ';
import Home from './pages/Home';
import Navbar from './components/navbar/Navbar';
import Licenses from './pages/Licenses';

function App() {
    
    return (
        <RecoilRoot>
           <Navbar/> 
            <Routes>
                <Route path="/" element={<Home/>}/>
                 <Route path="/minside" element={<MyPage/>}/> 
                <Route path="/lisensportal" element={<Licenses/>}/>
                 <Route path="/FAQ" element={<FAQ/>}/>
            </Routes>
        </RecoilRoot>
    );
}


export default App;
