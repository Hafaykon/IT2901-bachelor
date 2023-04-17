import * as React from 'react';
import {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Grid, Stack} from '@mui/material';
import ActiveLastBreadcrumb from '../ActivateLastBreadcrumb';
import { useRecoilValue } from 'recoil';
import { userAtom } from "../../globalVariables/variables";
import { BoardInformation } from '../../Interfaces';

function createData(
    position: number,
    unit: string,
    percentage: number,
) {
    return { position, unit, percentage };
}

const rows = [
    createData(1, 'Arbeidsmiljøenheten', 90),
    createData(2, 'IT-tjenesten', 59),
    createData(3, 'Kulturenheten', 20),


];


/** 
interface RowProps {
    row: BoardInformation;
}*/

interface Leaderboard {
    organization: string;
    percentage: number;
    ranking: number,
}

export function Leaderboard() {
    //const {row} = props;
    const [open, setOpen] = React.useState(false);
    
    const [data, setData] = React.useState<Leaderboard[]>([]);
    const accessToken = localStorage.getItem('access');
    const userInfo = useRecoilValue(userAtom);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/licenses/leaderboard/?organization=${userInfo.organization}`, {
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${accessToken}`
    },
});
            const data = await response.json();
            setData(data);
            console.log(data);
        }
        fetchData();
    }, []);
    return (
        <>
            <div>
                <Grid sx={{paddingTop: 5, paddingLeft: 25}}>
                    <ActiveLastBreadcrumb/>
                </Grid>
                <Box data-testid="leaderboard"
                     style={{display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '20px'}}>
                    <Grid justifyContent={'center'} alignItems={'center'} width={'75%'}>
                        <Stack direction={'column'} width={'75%'}>
                            <h2 style={{fontFamily: 'Source Sans Pro, sans serif'}}>Ledertavle</h2>
                            <p style={{fontStyle: 'italic', marginTop: '-10px', marginBottom: '50px'}}>Ledertavlen
                                viser
                                hvordan din enhet ligger ann i forhold til andre enheter basert på hvor stor andel
                                av
                                lisensen en har er i bruk</p>
                        </Stack><TableContainer component={Paper}>
                        <Table sx={{minWidth: 650, borderRadius: '50px', fontWeight: '700'}}
                               aria-label="simple table">
                            <colgroup>
                                <col style={{width: '15%'}}/>
                                <col style={{width: '80%'}}/>
                                <col style={{width: '5%'}}/>
                            </colgroup>
                            <TableHead>
                                <TableRow sx={{fontWeight: 'bold'}}>
                                    <TableCell></TableCell>
                                    <TableCell align='left'>Enhet</TableCell>
                                    <TableCell align="center">Prosent</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.position}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.position}
                                        </TableCell>
                                        <TableCell align="left">{row.unit}</TableCell>
                                        <TableCell align="center">{row.percentage}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </TableContainer>
                    </Grid>
                </Box>
            </div>
        </>
    );
}

