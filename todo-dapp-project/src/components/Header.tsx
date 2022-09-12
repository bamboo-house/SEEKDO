import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@mui/material';

const useStyles: any = makeStyles(() => ({
  typographyStyles: {
    flex: 1
  }
}));

export const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
        <Toolbar>
            <Typography className={classes.typographyStyles}>ヘッダー</Typography>
        </Toolbar>
    </AppBar>
  );
};