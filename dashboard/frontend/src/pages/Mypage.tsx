import React from 'react';
import MyPageTable from '../components/mypage/MyPageTable';
import './MyPage.css';
import DonutChart from '../components/dashboard/DonutChart';

function MyPage() {
    return (
        <div>
            <div id="minside">
                <h1>Min side</h1>
                <div id="charts">
                    <MyPageTable/>
                    <DonutChart/>
                </div>
            </div>
        </div>
    );
}

export default MyPage;