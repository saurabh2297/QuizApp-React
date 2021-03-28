import React, {useState} from 'react'
import {Typography,} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { styles } from "../helpers";
import { createMarkup } from "../helpers";
import Button from '@material-ui/core/Button';
import Home from "./Form";
import ReplayIcon from '@material-ui/icons/Replay';

const useStyles = makeStyles((theme) => {
    return styles;
});

const End = (props) => {
    const correct = props.score/10;
    const classes = useStyles();
    const [step,setStep] = useState(props.step)
    const handleClick=(event)=>{
        event.preventDefault()
        setStep('start')
    }
    return (
        <>
        {step==="end"?
        <> 
        <Typography  variant="h5" className={classes.question}>
                <span dangerouslySetInnerHTML={createMarkup(`${props.name} , You scored ${props.score} out of 100 `)} /> 
        </Typography>  
        <Typography  variant="h5" className={classes.question}>
                <span dangerouslySetInnerHTML={createMarkup(`You answered ${correct} questions correctly out of 10`)} /> 
        </Typography>  
        <Button
                  className={classes.submitButton}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={handleClick}
                >
                  PLAY AGAIN <ReplayIcon/>
                </Button>
        </>:<Home step={step}/>}</>
    )
}

export default End
