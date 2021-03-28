import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


//Appbar component from Material-ui with required modifications

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar= () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        
          <Typography align={'center'} variant="h4" className={classes.title}>
            Quick Quiz App
          </Typography>

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar