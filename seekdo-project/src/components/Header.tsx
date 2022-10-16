import React from 'react';
// mui
import { Box, AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import HdrStrongIcon from '@mui/icons-material/HdrStrong';

type Props = {
  connectWallet: () => Promise<void>;
  currentAccount: string;
}

export const Header: React.FC<Props> = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" size="large" sx={{ mr: 2 }}><HdrStrongIcon/></IconButton>
          <Typography color="inherit" component="div" variant="h6" sx={{ flexGrow: 1 }}>SEEKDO</Typography>
          {!props.currentAccount && (
            <Button color="inherit" variant="text" onClick={props.connectWallet}>ウォレット接続</Button>
          )}
          {props.currentAccount && (
            <Button color="inherit" variant="text" onClick={props.connectWallet}>ウォレット接続済み</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};