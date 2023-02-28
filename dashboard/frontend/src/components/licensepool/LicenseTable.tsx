import {softwareUserAtom} from "../../globalVariables/variables";
import {useRecoilValue} from "recoil";
import * as React from 'react';
import {useEffect} from 'react';
import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';


export default function LicenseTable() {
    const software = useRecoilValue(softwareUserAtom);
    const [loaded, setLoaded] = React.useState(false);
    const rows: GridRowsProp = useRecoilValue(softwareUserAtom);

    const columns: GridColDef[] = [
        {field: 'full_name', headerName: 'Navn', width: 300},
        {
            field: 'email', headerName: 'Epost', width: 300, renderCell: (params) => {
                const email = params.value;
                return (
                    <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
                        {email}
                    </a>
                );
            },
        },
        {field: 'organization', headerName: 'Organisasjon', width: 300},
        {field: 'total_minutes', headerName: 'Totale minutter', width: 120},
        {field: 'active_minutes', headerName: 'Aktive minutter', width: 120},

    ];

    useEffect(() => {
        if ((software.length) > 0) {
            setLoaded(true);
        }

    }, [software]);


    // return (
    //     <>
    //         {loaded ? (
    //             <>
    //                 <h1>Viser </h1>
    //                 <div className={"license_table"}
    //                 style={{display: 'flex', justifyContent: "center"}}>
    //                     <TableContainer component={Paper}>
    //                         <Table sx={{minWidth: 650}} aria-label="simple table">
    //                             <TableHead>
    //                                 <TableRow>
    //                                     <TableCell><h3>Fult navn</h3></TableCell>
    //                                     <TableCell align="justify">Epost</TableCell>
    //                                     <TableCell align="right">totale minutter</TableCell>
    //                                     <TableCell align="right">Aktive minutter</TableCell>
    //                                 </TableRow>
    //                             </TableHead>
    //                             <TableBody>
    //                                 {software.map((user: UserData) => (
    //                                     <TableRow
    //                                         key={user.full_name}
    //                                         sx={{'&:last-child td, &:last-child th': {border: 0}}}
    //                                     >
    //                                         <TableCell component="th" scope="row">
    //                                             {user.full_name}
    //                                         </TableCell>
    //                                         <TableCell align="right">{user.email}</TableCell>
    //                                         <TableCell align="right">{user.total_minutes}</TableCell>
    //                                         <TableCell align="right">{user.active_minutes}</TableCell>
    //                                     </TableRow>
    //                                 ))}
    //                             </TableBody>
    //                         </Table>
    //                     </TableContainer>
    //                 </div>
    //
    //
    //             </>
    //
    //
    //         ) : (
    //             <h1>Software not found</h1>
    //         )}
    //     </>
    //
    // );
    return (
        <div style={{
            display: "flex",
            width: '65%',
            justifyContent: "center",
            border: "3px solid grey",
            borderRadius: "10px"
        }}>
            <DataGrid autoHeight={true} pageSize={30} rows={rows} columns={columns}/>
        </div>
    );

}