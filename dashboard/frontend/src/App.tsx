import React from 'react';
import './App.css';
import InfoBox from './components/dashboard/InfoBox';
import { Stack,  } from '@mui/material';
import Navbar from './components/navbar/NavBar';
import { BrowserRouter as Router,  Route } from 'react-router-dom';

function App() {
  return (
    <><div className={'App'}>
      <Router>
      <Navbar />
      {/* <Switch>
      <Route path='/' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/products' component={Products} />
      </Switch> */}
      </Router>
        <Stack direction="row" spacing={8}>
        {/* <InfoBox title="Totale Lisenser" numberOfLicenses={2100} />
        <InfoBox title="Aktive Lisenser" numberOfLicenses={2000} />
        <InfoBox title="Allokerbare Lisenser" numberOfLicenses={100} /> */}
        
      </Stack>
    </div></>
   
  );
}


export default App;
