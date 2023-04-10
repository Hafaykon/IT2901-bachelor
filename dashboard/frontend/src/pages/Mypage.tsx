import React from 'react';
import MyPageTable from '../components/mypage/MyPageTable';
import './MyPage.css';
import Info from '../components/mypage/Info';
import { IUser } from '../components/mypage/types';


function MyPage() {
  const user: IUser = {
    name: 'Emma Blix',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  return (
    <div id="minside">
      <h1>Min side</h1>
      <div className="centered">
        <Info name={user.name} avatarUrl={user.avatarUrl} />
        </div>
      <div id="charts" style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <MyPageTable />
        </div>
        <div style={{ width: '50%' }}>
        </div>
      </div>
    </div>
  );
}

export default MyPage;