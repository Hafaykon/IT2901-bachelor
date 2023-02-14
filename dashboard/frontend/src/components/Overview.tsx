import React, { useEffect, useState } from 'react';
import { fetchOrganizations, fetchSoftwareRecommendations } from '../api/calls';


const Overview: React.FC = () => {
  const [organizations, setOrganizations] = useState<any>();

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
   <button style={{width: 500, height: 500}} onClick={() => console.log(organizations)}>
button
   </button>

  );

};


export default Overview;