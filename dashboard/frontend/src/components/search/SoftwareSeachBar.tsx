import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


interface SoftwareSearchBarProps {

    setSelectedSoftware: (value: string) => void;
    data: string[];

}


const SoftwareSearchBar: React.FC<SoftwareSearchBarProps> = ({data, setSelectedSoftware}) => {
    const [value, setValue] = React.useState<string | null>(null);
    const [inputValue, setInputValue] = React.useState<string>('');


    return (
        <>
            {data ? (
                <>
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            setSelectedSoftware(newValue || "");
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={data}
                        sx={{width: 450}}
                        renderInput={(params) => (
                            <TextField
                                data-testid="autocomplete-search"
                                {...params}
                                style={{backgroundColor: "white"}}
                                label="Søk"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <SearchIcon/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                </>
            ) : (
                <>
                    <h1>Loading</h1>
                </>
            )}
        </>
    );
}
export default SoftwareSearchBar;