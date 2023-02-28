import React, {SyntheticEvent, useEffect, useState} from 'react';
import {fetchOrganizations, fetchSoftwareUsedInOrg} from '../api/calls';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useSetRecoilState} from 'recoil';
import {orgAtom, softwareAtom} from '../globalVariables/variables';


/**
 * Component for fetching organizations from the backend and displaying them in a dropdown with search.
 * @constructor
 */
const OrganizationSelector: React.FC = () => {
    const storedOrganizationString: string | null = localStorage.getItem('organization');
    const [organizations, setOrganizations] = useState<string[]>([]);
    const [value, setValue] = React.useState<string | null>(
        storedOrganizationString ? JSON.parse(storedOrganizationString) : null
    );
    const [inputValue, setInputValue] = React.useState<string>('');
    const setSoftware = useSetRecoilState(softwareAtom);
    const setOrg = useSetRecoilState(orgAtom);

    useEffect(() => {
        const fetchData = async () => {
            const data: string[] | undefined = await fetchOrganizations();
            if (data !== undefined) {
                setOrganizations(data);
            }
        };

        const fetchSoftwareUsed = async () => {
            if (value) {
                const data: string[] | undefined = await fetchSoftwareUsedInOrg(value);
                if (data !== undefined) {
                    setSoftware(data);
                }
            }

        };

        fetchData();
        fetchSoftwareUsed();
    }, []);

    /**
     * Called when the user has selected an organization.
     * @param org - The organization that was selected.
     */
    const fetchSoftwareUsed = async (org: string) => {
        const data: string[] | undefined = await fetchSoftwareUsedInOrg(org);
        if (data !== undefined) {
            setSoftware(data);
        }

    };


    return (
        <>
            {organizations && <Autocomplete

                data-testid='autocomplete-search'
                value={value}
                onChange={(event: SyntheticEvent, newValue: string | null) => {
                    setValue(newValue);

                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    localStorage.setItem('organization', JSON.stringify(newInputValue));
                    setOrg(newInputValue);
                    fetchSoftwareUsed(newInputValue as unknown as string);


                }}
                id='controllable-states-demo'
                options={organizations}
                sx={{width: 350}}
                renderInput={(params) => <TextField {...params} style={{background: "white"}} label='Velg organisasjon'
                                                    data-testid='search-box'/>}
            />}
            {!organizations && <div>Loading organizations...</div>}
        </>


    );
};


export default OrganizationSelector;