
import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Box, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Nav = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{background: "#0f6dab"}}>
                <Box display="flex" justifyContent="center">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Desafio Sigalei
                        </Typography>
                    </Toolbar>
                </Box>
            </AppBar>
        </div>
    )
}
export default Nav 