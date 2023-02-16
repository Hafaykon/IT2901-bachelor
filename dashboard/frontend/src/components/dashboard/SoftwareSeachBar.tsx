import React, { SyntheticEvent, useEffect } from 'react';
import { fetchOrgSoftwareByName } from '../../api/calls';
import Autocomplete from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


interface SoftwareData {
  id: number;
  name: string | null;
}


const SoftwareSearchBar: React.FC = () => {
  const storedSoftware: string | null = localStorage.getItem('software');
  const storedOrganization: string | null = JSON.parse(localStorage.getItem('organization') ?? 'null');
  const [software, setSoftware] = React.useState<SoftwareData[] | undefined>(
    storedSoftware  ? JSON.parse(storedSoftware) : null
  );

  const [value, setValue] = React.useState<SoftwareData | null>(null);
  const [inputValue, setInputValue] = React.useState('');

  const fetchSoftwareUsed = async (software?: string, organization?: string) => {
    console.log(software, organization);
    const data = await fetchOrgSoftwareByName(software as string, organization as string);
    console.log(data);
  };

  useEffect(() => {
    setSoftware(storedSoftware ? JSON.parse(storedSoftware) : null);

  }, []);


  return (
    <>
      {software &&
        <Autocomplete
          data-testid='autocomplete-search'
          value={value}
          onChange={(event: SyntheticEvent, newValue: SoftwareData | null) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            fetchSoftwareUsed(newInputValue, storedOrganization || '');
          }}
          id='controllable-states-demo'
          options={software}
          sx={{ width: 450 }}
          renderInput={(params: TextFieldProps) => (
            <TextField
              inputProps={{
                'data-testid': 'search-field'
              }}

              fullWidth
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
        />}
      {!software && <div>Loading organizations...</div>}
    </>


  );
};

export default SoftwareSearchBar;