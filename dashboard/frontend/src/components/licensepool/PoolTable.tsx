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
                <TableCell sx={{textAlign: "left", paddingRight: "20px"}}>{row.freed_by_organization}</TableCell>
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
                                        <TableCell align="left"><b>Frigitt av</b></TableCell>
                                        <TableCell align="left"><b>Dato lagt til</b></TableCell>
                                        <TableCell align="left"><b>Pris</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.details.map((detailRow) => (
                                        <TableRow key={detailRow.id}>
                                            <TableCell component="th" scope="row">
                                                {detailRow.freed_by_organization ?? 'Ukjent'}
                                            </TableCell>
                                            <TableCell>{detailRow.date_added ?? 'Ukjent'}</TableCell>
                                            <TableCell align="left">{detailRow.price},-</TableCell>
                                            <TableCell> <BuyButton id={detailRow.spc_id}
                                                                   application_name={row.application_name}
                                            />
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
    data: LicensePoolData[];
    handleSorting: (sortBy: string) => void;
}

export default function PoolTable({data, handleSorting}: Props) {
    const software = data;
    const [loaded, setLoaded] = React.useState(false);
    console.log(software);


// Rest of the component code


    useEffect(() => {
        if ((software.length) > 0) {
            setLoaded(true);
        }

    }, [software]);

    return (
        <>
            {loaded ? (
                <div style={{width: "95%"}}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <colgroup>
                                <col style={{width: '5%'}}/>
                                <col style={{width: '25%'}}/>
                                <col style={{width: '35%'}}/>
                            </colgroup>
                            <TableHead>
                                <TableRow>
                                    <TableCell/>
                                    <TableCell onClick={() => handleSorting("application_name")}
                                               style={{cursor: "pointer"}}><b>Lisensnavn&#9660;</b></TableCell>
                                    <TableCell onClick={() => handleSorting("organization")} align={"left"}
                                               style={{cursor: "pointer"}}> <b>Enhet&#9660;</b></TableCell>
                                    <TableCell align={"left"}><b>Kontaktinformasjon</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {software.map((user, index) => (
                                    <Row key={index} row={user}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) : <h3>Velg programvare </h3>}
        </>
    );
}
