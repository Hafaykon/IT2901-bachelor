import React, { useEffect, useState } from 'react';
import { fetchOrganizations } from '../api/calls';
import { Stack } from '@mui/material';
import InfoBox from '../components/dashboard/InfoBox';


const Overview: React.FC = () => {
  const [organizations, setOrganizations] = useState<unknown>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOrganizations();
      setOrganizations(data);
      console.log(organizations);
    };

    fetchData();
  }, []);


  // return (
  //   <ul>
  //     {organizations?.map((organization: string, index: React.Key | number) => (
  //       <li key={index}>{organization}</li>
  //     ))}
  //   </ul>
  // );
  return (
    <div>
     <Stack direction="row" spacing={8}>
        <InfoBox title="Totale Lisenser" numberOfLicenses={2100} />
        <InfoBox title="Aktive Lisenser" numberOfLicenses={2000} />
        <InfoBox title="Allokerbare Lisenser" numberOfLicenses={100} />
      </Stack>

   <button style={{width: 500, height: 500}} onClick={() => console.log(organizations)}>
button
   </button>
  </div>
  );

};


export default Overview;