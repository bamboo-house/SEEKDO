import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header = () => {

  return (
    <AppBar position="static" color="transparent" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h4" color="white" >SeekDo</Typography>
      </Toolbar>
    </AppBar>
  );
};