import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import HdrStrongIcon from '@mui/icons-material/HdrStrong';

export const Header = () => {
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
      //   <Box sx={{ flexGrow: 1 }}>
      //   <AppBar position="static">
      //     <Toolbar>
      //       <IconButton
      //         size="large"
      //         edge="start"
      //         color="inherit"
      //         aria-label="menu"
      //         sx={{ mr: 2 }}
      //       >
      //         f
      //       </IconButton>
      //       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      //         News
      //       </Typography>
      //       <Button color="inherit">Login</Button>
      //     </Toolbar>
      //   </AppBar>
      // </Box>
  );
};