import * as React from 'react';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IUser } from './types';

function Info({ name, avatarUrl, email}: IUser) {
  return (
    <Paper
      sx={{
        padding: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '92.5%'
      }}
    >
      <Avatar
        alt={name}
        src={avatarUrl}
        sx={{ marginRight: '40px', width: '150px', height: '150px', flex: 'none' }}
      />
      <div style={{ flex: 1, marginLeft: '40px' }}>
        <Typography variant="h6" sx={{ marginBottom: '20px', marginTop: '20px', fontFamily: 'Source Sans Pro,sans-serif'}}>
          Navn: {name}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: '20px', fontFamily: 'Source Sans Pro,sans-serif' }}>
          Epost: {email}
        </Typography>
      </div>
    </Paper>
  );
}

export default Info;
