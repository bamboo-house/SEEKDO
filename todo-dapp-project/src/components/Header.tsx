import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import HdrStrongIcon from '@mui/icons-material/HdrStrong';

export const Header = () => {

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" size="large" sx={{ mr: 2 }}><HdrStrongIcon/></IconButton>
        <Typography color="white"  variant="h6">SEEKDO</Typography>
      </Toolbar>
    </AppBar>
  );
};