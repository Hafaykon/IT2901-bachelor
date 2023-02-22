import React from 'react';
import { fetchOrgSoftwareByName } from '../api/calls';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useRecoilValue } from 'recoil';
import { softwareAtom } from '../globalVariables/variables';

interface UserData {
  active_minutes: number;
  email: string;
  full_name: string;
  total_minutes: number;

}


const SoftwareSearchBar: React.FC = () => {
  const storedOrganization: string | null = JSON.parse(localStorage.getItem('organization') ?? 'null');
  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState<string>('');
  const software = useRecoilValue(softwareAtom);
  const [userData, setUserData] = React.useState<UserData[] | undefined>();

  /**
   * Fetches distinct software used by an organization.
   * @param software - Software name to search for.
   * @param organization - Organization to search for software in.
   */
  const fetchSoftwareUsed = async (software?: string, organization?: string) => {
    if (software && !software.includes(software)) {
      throw new Error(`Software "${software}" not found in the list of available software.`);
    }
    const data: UserData[] | undefined = await fetchOrgSoftwareByName(software, organization);
    if (data !== undefined) {
      setUserData(data);
      console.log(data);
    }
  };


  return (
    <>
      {software ? (
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            fetchSoftwareUsed(newValue || '', storedOrganization || '');
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id='controllable-states-demo'
          options={software}
          sx={{ width: 450 }}
          renderInput={(params) => (
            <TextField
              data-testid='autocomplete-search'
              {...params}
              label='Søk'
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      ) : (
        <div>Loading organizations...</div>
      )}
      <ul
      style={{listStyle: 'none'}}>
        {userData?.map((user) => (
          <li key={user.email}>
            <h1>
              {user.full_name}
            </h1>
            <h3>
              Email: {user.email}
            </h3>
            <h3> Active minutes {user.active_minutes} </h3>
            <h3> Total minutes {user.total_minutes} </h3>
          </li>
        ))}
      </ul>
    </>
  );
};
export default SoftwareSearchBar;