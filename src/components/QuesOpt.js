import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import {Typography} from '@material-ui/core'
import { createMarkup } from "../helpers";
import {useState} from 'react'
import Notification from './Notification'
import End from './End'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

const QuesOpt= (props) =>{
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
    
  };

  const [index,setIndex] = useState(0)
  const [step,setStep] = useState(props.step)
  const [check,setCheck] = useState('')
  const [score,setScore] = useState(0)

  
  const handleSubmit = (event) => { 
    event.preventDefault()   
    //if user is on last question changing the step to end so as to render result
    if(index===9){
        setStep('end')
        setCheck('')
        return
    } 
    //rendering next question and showing user only if current question answered also updating the score accordingly
    if(value!=='' && index<9){
        setIndex(index+1)
        if (value === props.data[index].correct_answer) {
            setCheck('correct')
            setScore(score+10)
          } 
           else {
            setCheck('wrong')
          }  
          //used set timeout to autohide correct/wrong answer notification after 5 seconds 
          setTimeout(function () {
          setCheck('')
        }, 5000)
        setValue('')
    }
    //if user didn't selected any option and trying to move forward 
    else{
        setHelperText('Please select an option')
        setError(true)
    }
  };

  return (
    <>
    <div style={{display:"block",width:"100%",height:"4vw"}}>
    {check==='correct'?<Notification check={'correct'}/>
    :check==='wrong'?<Notification check={'wrong'}/>
    :null}</div>
    {step==='play'?
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset"  className={classes.formControl}>
        <FormLabel component="legend">
        <Typography  variant="h5" >
                <span dangerouslySetInnerHTML={createMarkup(props.data[index].question)} /> 
            </Typography>  
        </FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
        {props.data[index].options.map((option,index) => (
            <FormControlLabel key={index} value={option} control={<Radio />} label={option} /> ))}
        </RadioGroup>
        <FormHelperText error={error}>{helperText}</FormHelperText>
        <Button type="submit" variant="outlined" color="primary" className={classes.button}>
          Next
        </Button>
      </FormControl>
    </form>:<End name={props.playerName} score={score} step={step} />}
    </>
  );
}

export default QuesOpt