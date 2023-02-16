import React, { SyntheticEvent, useEffect, useState } from 'react';
import { fetchOrganizations, fetchSoftwareUsedInOrg, fetchSoftwareUsers } from '../../api/calls';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


interface Organization {
  id: number;
  name: string | null;
}

/**
 * Component for fetching organizations from the backend and displaying them in a dropdown with search.
 * @constructor
 */
const OrganizationSelector: React.FC = () => {
  const storedOrganizationString: string | null = localStorage.getItem('organization');
  const [organizations, setOrganizations] = useState<Organization[] | undefined>([]);
  const [value, setValue] = React.useState<Organization | null>(
    storedOrganizationString ? JSON.parse(storedOrganizationString) : null
  );
  const [inputValue, setInputValue] = React.useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOrganizations();
      setOrganizations(data);
    };

    fetchData();
  }, []);

  const fetchSoftwareUsed = async (org: string) => {
    const data = await fetchSoftwareUsedInOrg(org);
    localStorage.setItem('software', JSON.stringify(data));
    console.log(data);

  };


  return (
    <>
      {organizations && <Autocomplete
        value={value}
        onChange={(event: SyntheticEvent, newValue: Organization | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          console.log(newInputValue);
          localStorage.setItem('organization', JSON.stringify(newInputValue));
          fetchSoftwareUsed(newInputValue);
        }}
        id='controllable-states-demo'
        options={organizations}
        sx={{ width: 350 }}
        renderInput={(params) => <TextField {...params} label='Velg organisasjon' />}
      />}
      {!organizations && <div>Loading organizations...</div>}
    </>


  );
};


export default OrganizationSelector;