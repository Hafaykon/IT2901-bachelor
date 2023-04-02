import React, {useEffect} from 'react';
import './App.css';
import {useRecoilState} from 'recoil';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/authentication/Login';
import MyPage from './pages/Mypage';
import LicenseInfo from './components/LicenseInfo';
import Licenses from './pages/Licenses';
import FAQ from './pages/FAQ';
import {Leaderboard} from './components/leaderboard/Leaderboard';
import {isAuthAtom} from "./globalVariables/variables";
import Navbar from './components/navbar/Navbar';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthAtom);
    const token = localStorage.getItem('access')
    useEffect(() => {
        const isLoggedIn = async () => {
            if (token) {
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/login/verify/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            token: token,
                        }),

                    })
                    if (response.ok) {
                        setIsAuthenticated(true)
                    }

                } catch (error) {
                    console.error(error);
                }
            }
        }
        isLoggedIn()

    }, [token])
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/" element={isAuthenticated ? <Home/> : <Navigate to="/Login"/>}/>
                <Route path="/minside" element={isAuthenticated ? <MyPage/> : <Navigate to="/Login"/>}/>
                <Route path="/:title" element={isAuthenticated ? <LicenseInfo/> : <Navigate to="/Login"/>}/>
                <Route path="/lisensportal" element={isAuthenticated ? <Licenses/> : <Navigate to="/Login"/>}/>
                <Route path="/FAQ" element={isAuthenticated ? <FAQ/> : <Navigate to="/Login"/>}/>
                <Route path="/leaderboard" element={isAuthenticated ? <Leaderboard/> : <Navigate to="/Login"/>}/>
            </Routes>
        </>
    );
}


export default App;
