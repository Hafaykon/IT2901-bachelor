import * as React from 'react';
import {useEffect} from 'react';
import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import {SoftwareData} from "../../Interfaces";

interface LicenseTableProps {
    data: SoftwareData[];
}

export default function LicenseTable({data}: LicenseTableProps) {
    const [loaded, setLoaded] = React.useState(false);
    const rows: GridRowsProp = data;

    const columns: GridColDef[] = [
        {field: 'primary_user_full_name', headerName: 'Navn', width: 300},
        {field: 'computer_name', headerName: 'Datamaskin', width: 300},
        {field: 'last_used', headerName: 'Sist brukt', width: 300},
        {
            field: 'primary_user_email', headerName: 'Epost', width: 300, renderCell: (params) => {
                const email = params.value;
                return (
                    <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
                        {email}
                    </a>
                );
            },

        },


    ];

    useEffect(() => {
        if ((data.length) > 0) {
            setLoaded(true);
        }

    }, [data]);

    return (
        <> {loaded ? (
            <DataGrid autoHeight={true} pageSize={30} rows={rows} columns={columns}/>
        ) : (<h4>Data not loaded</h4>)}</>
    );

}