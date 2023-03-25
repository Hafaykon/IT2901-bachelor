import * as React from 'react';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IUser } from './types';

function Info({ name, avatarUrl }: IUser) {
  return (
    <Paper
      sx={{
        padding: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: 1000,
        marginLeft: '0'
      }}
    >
      <Avatar
        alt={name}
        src={avatarUrl}
        sx={{ marginRight: '40px', width: '150px', height: '150px', flex: 'none' }}
      />
      <div style={{ flex: 1, marginLeft: '40px' }}>
        <Typography variant="h6" sx={{ marginBottom: '20px' }}>
          Name: {name}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: '20px' }}>
          Email: emma.blix@eksempel.com
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: '20px' }}>
          Telefon: 123 45 678
        </Typography>
      </div>
    </Paper>
  );
}

export default Info;
