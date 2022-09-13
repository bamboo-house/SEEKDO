import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header = () => {

  return (
    <AppBar position="static" sx={{mb: 3}}>
        <Toolbar>
            <Typography>ヘッダー</Typography>
        </Toolbar>
    </AppBar>
  );
};