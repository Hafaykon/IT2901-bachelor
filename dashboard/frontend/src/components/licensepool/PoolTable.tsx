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
import {LicensePoolData} from '../../Interfaces';
import BuyButton from "./BuyButton";
import Pagination from '@mui/material/Pagination';


interface RowProps {
    row: LicensePoolData;
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
                <TableCell sx={{textAlign: "left", paddingRight: "20px"}}>{row.organization}</TableCell>
                <TableCell>
                    <div>
                        <a href={`mailto`} target="_blank"
                           rel="noopener noreferrer">
                            {"navn@email.com"}
                        </a>
                    </div>

                </TableCell>
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
                                        <TableCell align="left"><b>Bruker</b></TableCell>
                                        <TableCell align="left"><b>Løpenummer</b></TableCell>
                                        <TableCell align="left"><b>Email</b></TableCell>
                                        <TableCell align="left"><b>Sist åpnet</b></TableCell>
                                        <TableCell align={"left"}><b>Kjøp lisens</b></TableCell>
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
                                                <div>
                                                    <a href={`mailto:${detailRow.email}`} target="_blank"
                                                       rel="noopener noreferrer">
                                                        {detailRow.email}
                                                    </a>
                                                </div>
                                            </TableCell>
                                            <TableCell>{detailRow.last_used ?? 'Ikke registrert'}</TableCell>
                                            <TableCell> <BuyButton id={detailRow.id}
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
    data: LicensePoolData[];
}

export default function PoolTable({
    data
}: Props) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const ITEMS_PER_PAGE = 5;
    const software = data;
    const [loaded, setLoaded] = React.useState(false);
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: React.SetStateAction<number>) => {
        setCurrentPage(value);
    };
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const displayedSoftware = software.slice(startIndex, endIndex);

    useEffect(() => {
        if ((software.length) > 0) {
            setLoaded(true);
        }

    }, [software]);

    return (
        <>
            {loaded ? (
                <div style={{ width: "75%" }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell><b>Lisensnavn</b></TableCell>
                                    <TableCell align={"left"}><b>Enhet</b></TableCell>
                                    <TableCell align={"left"}><b>Kontaktinformasjon</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedSoftware.map((user, index) => (
                                    <Row key={index} row={user} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        count={Math.ceil(software.length / ITEMS_PER_PAGE)}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                        size="small"
                        style={{ marginTop: '1rem' }}
                    />
                </div>
            ) : <h3>Velg programvare </h3>}
        </>
    );
}
