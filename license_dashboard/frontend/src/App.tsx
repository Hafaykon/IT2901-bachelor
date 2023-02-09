import { Button } from '@mui/material';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className={'App'}>
      <h1>Hello</h1>
    </div>
    <div className={'App'}>
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
    </div>
  );
}


export default App;
