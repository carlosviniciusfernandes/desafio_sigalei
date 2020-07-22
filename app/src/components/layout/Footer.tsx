
import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        background: "#64b5f6",
        padding:"2px"
    },
  }),
);

const Nav = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.footer}>
                <Box display="flex" justifyContent="center">
                    <span>Carlos Vinicius Fernandes, Julho de 2020</span>
                </Box>
            </AppBar>
        </div>
    )
}
export default Nav 