import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface IRow {
  lisensnavn: string;
  lopenummer: number;
  status: string;
}

function createData(
  lisensnavn: string,
  lopenummer: number,
  status: string,
): IRow {
  return { lisensnavn, lopenummer, status };
}

const rows: IRow[] = [
  createData('License 1', 1, 'Active'),
  createData('License 2', 2, 'Inactive'),
  createData('License 3', 3, 'Pending'),
  createData('License 1', 4, 'Active'),
  createData('License 2', 5, 'Inactive'),
  createData('License 3', 6, 'Pending'),
  createData('License 1', 7, 'Active'),
  createData('License 2', 8, 'Inactive'),
  createData('License 3', 9, 'Pending'),
];

function MyPageTable() {
  return (
    <TableContainer component={Paper} sx={{
      padding: '40px',
      maxWidth: '500px',
      margin: '40px auto',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      height: '100%',
      overflow: 'auto',
      maxHeight: '400px',
    }}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Lisensnavn</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Løpenummer</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.lisensnavn}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.lisensnavn}
              </TableCell>
              <TableCell align="right">{row.lopenummer}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyPageTable;