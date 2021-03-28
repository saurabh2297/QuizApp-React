import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

//Notification component from Material-ui with required modifications

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '30%',
    '& > * + *': {
      marginTop: theme.spacing(0),
    },
  },
}));

const Notification= (props)=> {
  const classes = useStyles();
  
  

  return (
    <div className={classes.root}>
      {props.check==='correct'?<Alert   severity="success">WoW!,That's Correct</Alert>:
      <Alert  severity="error">Oops! That's Wrong</Alert>}  
    </div>
  );
}

export default Notification