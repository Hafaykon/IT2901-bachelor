import React, { useEffect, useState } from 'react';
import {fetchOrganizations, fetchSoftwareRecommendations} from '../api/calls';


const Overview: React.FC = () => {
  const [organizations, setOrganizations] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSoftwareRecommendations();
      setOrganizations(data);
    };

    fetchData().then(() => console.log(organizations));
  }, []);


  // return (
  //   <ul>
  //     {organizations?.map((organization: string, index: React.Key | number) => (
  //       <li key={index}>{organization}</li>
  //     ))}
  //   </ul>
  // );
  return (
    <h1>hi</h1>
  )

};


export default Overview;