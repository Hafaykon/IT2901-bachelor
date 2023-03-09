import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSoftwareUsers } from '../api/calls';
import LicenseTable from './licensepool/LicenseTable';
import SoftwareSearchBar from './search/SoftwareSeachBar';

const LicenseInfo: React.FC = () => {

  interface LicenseData {
    application_name: string;
    users: {
      full_name: string;
      email: string;
      total_minutes: number;
      active_minutes: number;
    }[];
  }

  const { title } = useParams();
  const [licenses, setLicenses] = useState<LicenseData[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      if (title === 'Totale Lisenser') {
        const data: LicenseData[] | undefined = await fetchSoftwareUsers('IT-tjenesten'); //default
        setLicenses(data || []);
        console.log(data);
      } else if (title === 'Aktive Lisenser') {
        //TO-DO: Should be changed to Available licenses and add new view when pool is ready
        //const data = dummyArray;
        //setLicenses(data)
      } else if (title === 'Allokerbare Lisenser') {
        //TO-DO: Should be changed to Unused licenses and add new view when pool is ready
        //const data = dummyArray;
        //setLicenses(data)
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SoftwareSearchBar show={true} />
      <LicenseTable />
    </>)
};

export default LicenseInfo;