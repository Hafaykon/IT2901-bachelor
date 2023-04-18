import * as React from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Grid, Stack } from '@mui/material';
import ActiveLastBreadcrumb from '../ActivateLastBreadcrumb';
import { useRecoilValue } from 'recoil';
import { userAtom } from "../../globalVariables/variables";

interface Leaderboard {
    organization: string;
    active_percentage: number;
    rank: number,
}

export function Leaderboard() {

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
            setData(data.leaderboard);
            console.log(data);
            console.log(data.rank)
        }
        fetchData();
    }, []);

    const dataArr = Object.values(data);
    console.log(dataArr)

    //const lastRow = data[data.length - 1];

    return (
        <>
            <div>
                <Grid sx={{ paddingTop: 5, paddingLeft: 25 }}>
                    <ActiveLastBreadcrumb />
                </Grid>
                <Box data-testid="leaderboard"
                    style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '20px' }}>
                    <Grid justifyContent={'center'} alignItems={'center'} width={'75%'}>
                        <Stack direction={'column'} width={'90%'}>
                            <h2 style={{ fontFamily: 'Source Sans Pro, sans serif' }}>Ledertavle</h2>
                            <p style={{ fontStyle: 'italic', marginTop: '-10px', marginBottom: '50px' }}>Ledertavlen gir deg en visuell representasjon av 
                            hvordan din enhet presterer i forhold til andre enheter, 
                            basert på andelen av aktive lisenser. Topplisten gir en oversikt over de 25 enhetene med flest aktive lisenser, og indikerer dermed 
                            hvilke enheter som har færrest ubrukte lisenser.  </p>
                        </Stack>
                        <p>Din plassering</p>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650, fontWeight: '700', backgroundColor: '#C5DAF2' }}
                                aria-label="simple table">
                                <colgroup>
                                    <col style={{ width: '15%' }} />
                                    <col style={{ width: '80%' }} />
                                    <col style={{ width: '5%' }} />
                                </colgroup>
                                <TableHead>
                                    <TableRow sx={{ fontWeight: 'bold', padding: '10px' }}>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {data.map((row, index) => {
                                        if (userInfo.organization === row.organization) {
                                            return (
                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0, backgroundColor: '#80cc9f' } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.rank}
                                                    </TableCell>
                                                    <TableCell align="left">{row.organization}</TableCell>
                                                    <TableCell align="center">{row.active_percentage}</TableCell>
                                                </TableRow>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                </TableBody>

                            </Table>
                        </TableContainer>

                        <div style={{ padding: '10px' }}>

                        </div>
                        <p>Topplisten</p>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650, borderRadius: '50px', fontWeight: '700' }}
                                aria-label="simple table">
                                <colgroup>
                                    <col style={{ width: '15%' }} />
                                    <col style={{ width: '80%' }} />
                                    <col style={{ width: '5%' }} />
                                </colgroup>
                                <TableHead>
                                    <TableRow sx={{ fontWeight: 'bold' }}>
                                        <TableCell></TableCell>
                                        <TableCell align='left'>Enhet</TableCell>
                                        <TableCell align="center">Prosent</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.slice(0,25).map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.rank}
                                            </TableCell>
                                            <TableCell align="left">{row.organization}</TableCell>
                                            <TableCell align="center">{row.active_percentage}</TableCell>
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

