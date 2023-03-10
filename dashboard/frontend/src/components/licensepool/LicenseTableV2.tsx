import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {SoftwareUser} from '../../Interfaces';
import ReserveButton from "./ReserveButton";


interface RowProps {
    row: SoftwareUser;
}

function Row(props: RowProps) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.application_name}
                </TableCell>
                <TableCell>{row.organization}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detaljer
                            </Typography>

                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Navn</TableCell>
                                        <TableCell align="left">Datamaskin</TableCell>
                                        <TableCell align="left">Email</TableCell>
                                        <TableCell align="left">Totale minutter</TableCell>
                                        <TableCell align="left">Aktive minutter</TableCell>
                                        <TableCell align="left">Kjøp lisens</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.details.map((detailRow) => (
                                        <TableRow key={detailRow.id}>
                                            <TableCell component="th" scope="row">
                                                {detailRow.full_name ?? 'Ukjent'}
                                            </TableCell>
                                            <TableCell>{detailRow.computer_name ?? 'Ukjent'}</TableCell>
                                            <TableCell>
                                                <a href={`mailto:${detailRow.email}`} target="_blank"
                                                   rel="noopener noreferrer">
                                                    {detailRow.email}
                                                </a>
                                            </TableCell>
                                            <TableCell>{detailRow.total_minutes}</TableCell>
                                            <TableCell>{detailRow.active_minutes}</TableCell>
                                            <TableCell> <ReserveButton id={detailRow.id}
                                                                       full_name={detailRow.full_name}/> </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

interface Props {
    data: SoftwareUser[];
}

export default function LicenseTableV2({data}: Props) {
    const software = data;
    const [loaded, setLoaded] = React.useState(false);

    useEffect(() => {
        if ((software.length) > 0) {
            setLoaded(true);
        }

    }, [software]);

    return (
        <> {loaded ? (<div style={{width: "75%"}}><TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Applikasjon navn</TableCell>
                        <TableCell>Organisasjon</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {software.map((user, index) => (
                        <Row key={index} row={user}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer></div>) : <h3>Velg programvare </h3>} </>

    );
}