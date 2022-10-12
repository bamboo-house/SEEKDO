import React, { ReactNode } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import HdrStrongIcon from '@mui/icons-material/HdrStrong';

type Props = {
  setCurrentAccount: React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FC<Props> = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" size="large" sx={{ mr: 2 }}><HdrStrongIcon/></IconButton>
          <Typography color="inherit" component="div" variant="h6" sx={{ flexGrow: 1 }}>SEEKDO</Typography>
          <Button color="inherit" variant="text">ウォレット接続</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};