import React, {useEffect} from 'react';
import './App.css';
import {useRecoilState} from 'recoil';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/navbar/Navbar';
import Login from './pages/authentication/Login';
import MyPage from './pages/Mypage';
import LicenseInfo from './components/LicenseInfo';
import Licenses from './pages/Licenses';
import FAQ from './pages/FAQ';
import {Leaderboard} from './components/leaderboard/Leaderboard';
import {isAuthAtom} from "./globalVariables/variables";

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
                    const data = await response.json();
                    if (response.ok) {
                        setIsAuthenticated(true)
                        console.log(data)
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
                <Route path="/" element={isAuthenticated ? <Home/> : <Login/>}/>
                <Route path="/minside" element={isAuthenticated ? <MyPage/> : <Login/>}/>
                <Route path="/:title" element={isAuthenticated ? <LicenseInfo/> : <Login/>}/>
                <Route path="/lisensportal" element={isAuthenticated ? <Licenses/> : <Login/>}/>
                <Route path="/FAQ" element={isAuthenticated ? <FAQ/> : <Login/>}/>
                <Route path="/leaderboard" element={isAuthenticated ? <Leaderboard/> : <Login/>}/>
            </Routes>
        </>


    );
}


export default App;
