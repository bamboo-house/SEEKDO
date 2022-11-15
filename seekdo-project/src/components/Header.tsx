import React from 'react';
import { AccountContainer } from "../common/containers/AccountContainer";
// mui
import { Box, AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import HdrStrongIcon from '@mui/icons-material/HdrStrong';

export const Header: React.FC = (props) => {
  const { currentAccount, connectWallet } = AccountContainer.useContainer();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" size="large" sx={{ mr: 2 }}>
            <HdrStrongIcon />
          </IconButton>
          <Typography color="inherit" component="div" variant="h6" sx={{ flexGrow: 1 }}>
            SEEKDO
          </Typography>
          {!currentAccount && (
            <Button color="inherit" variant="text" onClick={connectWallet}>
              ウォレット接続
            </Button>
          )}
          {currentAccount && (
            <Button color="inherit" variant="text" onClick={connectWallet}>
              ウォレット接続済み
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
