import * as React from 'react';
import { Grid } from '@mui/joy';
import { DataGrid } from '@mui/x-data-grid';

interface Data {
  application_name: string;
  computer_name: string;
  status: string;
}

interface MyPageTableProps {
  data: Data[];
}

function MyPageTable({ data }: MyPageTableProps) {
  const columns = [
    { field: 'application_name', headerName: 'Lisensnavn', flex: 1 },
    { field: 'computer_name', headerName: 'Løpenummer', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
  ];

  return (
    <Grid container sx={{ marginTop: '3%' }}>
      <div
        style={{
          padding: '30px',
          marginTop: '20%',
          maxWidth: '420px',
          margin: '40px auto',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          height: '100%',
          overflow: 'auto',
          maxHeight: '420px',
          width: '100%',
        }}
      >
        <DataGrid
          rows={data.map((row, index) => ({ id: index, ...row }))}
          columns={columns}
          pageSize={5}
          autoHeight
          disableSelectionOnClick
        />
      </div>
    </Grid>
  );
}

export default MyPageTable;
