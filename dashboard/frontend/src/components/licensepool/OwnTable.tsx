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
import {OwnOrgData} from '../../Interfaces';
import ReleaseButton from "./ReleaseButton";


interface RowProps {
    row: OwnOrgData;
}

function Row(props: RowProps) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);

    function timeSince(lastUsed: string | null): string {
        if (!lastUsed) return 'Ikke registrert';

        const now = new Date();
        const lastUsedDate = new Date(lastUsed);
        const diffInDays = Math.floor((now.getTime() - lastUsedDate.getTime()) / (1000 * 60 * 60 * 24));

        return `${lastUsedDate.toLocaleDateString()} (${diffInDays} dager siden)`;
    }


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
                <TableCell sx={{textAlign: "left", paddingRight: "20px"}}>{row.primary_user_full_name}</TableCell>
                <TableCell sx={{textAlign: "left", paddingRight: "20px"}}>{row.computer_name}</TableCell>
                <TableCell sx={{textAlign: "left", paddingRight: "20px"}}>{row.status}</TableCell>

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
                                        <TableCell align="left"><b>Sist åpnet</b></TableCell>
                                        <TableCell align={"left"}><b>Mulig opptjeningspoeng</b></TableCell>
                                        <TableCell align={"center"}><b>Frigjør</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.details.map((detailRow) => (
                                        <TableRow key={detailRow.id}>
                                            <TableCell component="th" scope="row">
                                                {timeSince(detailRow.last_used)}
                                            </TableCell>
                                            <TableCell>10 poeng</TableCell>
                                            <TableCell align={"center"}> <ReleaseButton id={detailRow.id}
                                                                                        full_name={row.primary_user_full_name}/>
                                            </TableCell>

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
    data: OwnOrgData[];
}

export default function OwnTable({
                                     data
                                 }: Props) {

    const software = data;
    const [loaded, setLoaded] = React.useState(false);


    useEffect(() => {
        if ((software.length) > 0) {
            setLoaded(true);
            console.log(software);
        }

    }, [software]);

    return (
        <> {loaded && <div style={{width: "100%"}}><TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell><b>Lisensnavn</b></TableCell>
                        <TableCell align={"left"}><b>Bruker</b></TableCell>
                        <TableCell align={"left"}><b>Løpenummer</b></TableCell>
                        <TableCell align={"left"}><b>Status</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {software.map((user, index) => (
                        <Row key={index} row={user}/>
                    ))}
                </TableBody>

            </Table>
        </TableContainer></div>} </>

    );
}