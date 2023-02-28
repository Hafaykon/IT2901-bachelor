import React, {useEffect} from 'react';
import {fetchOrgSoftwareByName, fetchSoftwareUsedInOrg} from '../../api/calls';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {softwareAtom, softwareUserAtom} from '../../globalVariables/variables';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


interface UserData {
    id: number;
    active_minutes: number;
    email: string;
    organization: string;
    full_name: string;
    total_minutes: number;

}


const SoftwareSearchBar: React.FC = () => {
    const storedOrganization: string | null = JSON.parse(localStorage.getItem('organization') ?? 'null');
    const [value, setValue] = React.useState<string | null>(null);
    const [inputValue, setInputValue] = React.useState<string>('');
    const [software, setSoftware] = useRecoilState(softwareAtom);
    const setUserData = useSetRecoilState(softwareUserAtom);
    const [checked, setChecked] = React.useState(true);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setChecked(checked);
        fetchSoftwareUsed(value || '', checked ? storedOrganization as string : '');
    };


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
        }
    };

    useEffect(() => {
        // Data returned by api is string[]
        const fetchSoftwareUsed = async () => {
            if (storedOrganization) {
                const data: string[] | undefined = await fetchSoftwareUsedInOrg(storedOrganization);
                if (data !== undefined) {
                    setSoftware(data);
                }
            }

        };
        fetchSoftwareUsed();
    }, []);


    return (
        <>
            {software ? (
                <>
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            fetchSoftwareUsed(newValue || '', checked ? storedOrganization as string : '');
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id='controllable-states-demo'
                        options={software}
                        sx={{width: 450}}
                        renderInput={(params) => (
                            <TextField
                                data-testid='autocomplete-search'
                                {...params}
                                style={{backgroundColor: 'white'}}
                                label='Søk'
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton>
                                                <SearchIcon/>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />

                    <FormControlLabel
                        label="Søk i egen organisasjon"
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{'aria-label': 'controlled'}}
                            />
                        }
                    />

                </>

            ) : (
                <div>Loading organizations...</div>
            )}
        </>
    );
};
export default SoftwareSearchBar;