import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchLicensesAssociatedWithUser,
  fetchOrganizations,
  fetchSoftwareUsedInOrg,
  fetchSoftwareUsers
} from '../api/calls';

const LicenseInfo: React.FC = () => {
  const { title } = useParams();
  const [licenses, setLicenses] = useState<unknown>();

  const dummyArray = ["Functionality", "Not", "Supported", "Yet"]

  useEffect(() => {
    const fetchData = async () => {
      if (title === 'Totale Lisenser') {
        const data = await fetchSoftwareUsers("IT-tjenesten"); //default
        setLicenses(data)
        console.log(data);
      } else if (title === 'Aktive Lisenser') {
        //TO-DO: Should be changed to Available licenses and add new view when pool is ready
        const data = dummyArray
        setLicenses(data)
      }else if (title === 'Allokerbare Lisenser') {
        //TO-DO: Should be changed to Unused licenses and add new view when pool is ready
        const data = dummyArray
        setLicenses(data)
      }
    };

    fetchData();
    }, []);

  //Note: Currently expects that licenses is an array. Would likely need to be updated
  return(
    <div className="License-Info-Container">
      <h1>{(licenses as string[])?.join(', ')}</h1>
    </div>
  )
}

export default LicenseInfo;