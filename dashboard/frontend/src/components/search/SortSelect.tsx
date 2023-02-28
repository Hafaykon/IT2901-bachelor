import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function SelectSmall() {
    const [sort, setSort] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSort(event.target.value);
    };

    return (
        <FormControl sx={{m: 1, minWidth: 190}} size="small">
            <InputLabel id="demo-select-small">Sorter</InputLabel>
            <Select
                style={{background: "white"}}
                displayEmpty
                labelId="demo-select-small"
                id="demo-select-small"
                label="Sorter"
                autoWidth
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={"Suite"}>Suite</MenuItem>
                <MenuItem value={"Part Of Suite"}>Part Of Suite</MenuItem>
                <MenuItem value={"License Suite"}>License Suite</MenuItem>
                <MenuItem value={"Part Of License Suite"}>Part Of License Suite</MenuItem>
            </Select>
        </FormControl>
    );
}
