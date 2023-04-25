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
import {OwnOrgData} from '../../../Interfaces';
import ReleaseButton from "../ReleaseButton/ReleaseButton";
import {userAtom} from "../../../globalVariables/variables";
import {useRecoilValue} from "recoil";


interface RowProps {
    row: OwnOrgData;
}

function Row(props: RowProps) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const userData = useRecoilValue(userAtom)


    function timeSince(lastUsed: string | null): string {
        if (!lastUsed) return 'Aldri tatt i bruk/registrert   .';

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
                <TableCell sx={{
                    textAlign: "left",
                    paddingRight: "20px"
                }}>{row.details.length > 0 ? row.details[0].status : 'No status available'}</TableCell>

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
                                        <TableCell align="left"><b>Pris</b></TableCell>
                                        <TableCell align={"left"}><b>Frigjør</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.details.map((detailRow) => (
                                        <TableRow key={detailRow.id}>
                                            <TableCell component="th" scope="row">
                                                {timeSince(detailRow.last_used)}
                                            </TableCell>
                                            <TableCell>{detailRow.price},-</TableCell>
                                            <TableCell>
                                                {userData.primary_user_email === row.primary_user_email || userData.is_unit_head ? (
                                                    <ReleaseButton
                                                        spc_id={detailRow.id}
                                                        primary_user_email={row.primary_user_email}
                                                        application_name={row.application_name}
                                                        organization={row.organization}
                                                    />
                                                ) : <p>Ingen tillatelse &#128711;</p>}
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
    handleSorting: (sortBy: string) => void;
}

export default function OwnTable({data, handleSorting}: Props) {

    const software = data;
    const [loaded, setLoaded] = React.useState(false);

    useEffect(() => {
        if ((software.length) > 0) {
            setLoaded(true);
        }
    }, [software]);

    return (
        <> {loaded && <div style={{width: "100%"}}><TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell onClick={() => handleSorting("application_name")}
                                   style={{cursor: "pointer"}}><b>Lisensnavn&#9660;</b></TableCell>
                        <TableCell onClick={() => handleSorting("primary_user_full_name")}
                                   align={"left"} style={{cursor: "pointer"}}><b>Bruker&#9660;</b></TableCell>
                        <TableCell onClick={() => handleSorting("computer_name")}
                                   align={"left"} style={{cursor: "pointer"}}><b>Løpenummer&#9660;</b></TableCell>
                        <TableCell onClick={() => handleSorting("status")}
                                   align={"left"} style={{cursor: "pointer"}}><b>Status&#9660;</b></TableCell>
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