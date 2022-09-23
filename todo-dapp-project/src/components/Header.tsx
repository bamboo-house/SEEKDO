import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import HdrStrongIcon from '@mui/icons-material/HdrStrong';

export const Header = () => {

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}><HdrStrongIcon/></IconButton>
        <Typography variant="h6" color="white" >SEEKDO</Typography>
      </Toolbar>
    </AppBar>
  );
};