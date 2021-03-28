import axios from 'axios'
import {useEffect,useState} from 'react'
import {Grid,Select,Button,MenuItem,TextField,Typography,InputLabel,FormControl,} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { styles, difficulties, createMarkup } from "../helpers";
import QuesOpt from "./QuesOpt";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
  
  const useStyles = makeStyles((theme) => {
    return styles;
  });

//Form Component:- In this user will fill the form and we will fetch data according to the user entries

export const Form = (props) => {
    const [categories, setCategories] = useState([]);
    const [quizData,setQuizData] = useState([])
    const [category, setCategory] = useState({ id: "", name: "" });
    const [difficulty, setDifficulty] = useState({ id: "", name: "" });
    const [playerName,setPlayerName] = useState("")
    const [step,setStep] = useState(props.step)

    const classes = useStyles();

    //fetching quiz data 
    const fetchQuizData = async () => {
        try{
        const url = `https://opentdb.com/api.php?amount=10&category=${category.id}&difficulty=${difficulty.name.toLowerCase()}&type=multiple`;
  
        const { data } = await axios.get(url);//accessing data property from the response object
        const prettyData = data.results.map((questions)=>{
            const options = [...questions.incorrect_answers]
            const newIndex = Math.random() * (3) //random index to insert correct answer among all options
            options.splice(newIndex,0,questions.correct_answer)
            return {
                ...questions,
                options: options,
            }
        })
        setQuizData(prettyData)//setting the quiz data
        setStep('play') //changing step to render Question and options
        }catch (error) {
        console.log("Fetch quiz error =====>>>>", error);
        }
    }

    const fetchCategories = async () => {
        const { data } = await axios.get(`https://opentdb.com/api_category.php`);
        setCategories(data.trivia_categories);
      };
    
    useEffect(() => {
        fetchCategories();
      }, []); //fetching categories when the component mounts
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!quizData.length && playerName && category.id && difficulty) {
          fetchQuizData(); 
        }
      };//fetching quiz data only if all required entries are provided by user
    
    const handleSelectChange = (e) => {
        e.preventDefault();
        const selectedCategory = categories.find(
          (cat) => cat.id === e.target.value
        );
        setCategory(selectedCategory);
      };//setting up the category when user selects from list
    
    const handleDifficultyChange = (e) => {
        e.preventDefault();
        const selectedDifficulty = difficulties.find(
          (diff) => diff.id === e.target.value
        );
        setDifficulty(selectedDifficulty);
      };//setting up the difficulty when user selects from list

    const handleOnChange = (e) =>{
        setPlayerName(e.target.value)
    }//setting up the name when user enters his name
    
   
    
      if (!categories.length) {
        return null;}

    return (   
        <>
        {step === 'start' ?
        <>
              <Typography variant="h5" className={classes.mainTitle}>
                Test Your Knowledge:
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="text"
                      id="player-name"
                      variant="outlined"
                      name="player-name"
                      label={`Name`}
                      value={playerName || ""}
                      onChange={handleOnChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="category-select-label">
                        Select category:
                      </InputLabel>
                      <Select
                        required
                        name="category"
                        value={category.id || ""}
                        id="category-select"
                        label="Select category"
                        labelId="category-select-label"
                        onChange={handleSelectChange}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            <span
                              dangerouslySetInnerHTML={createMarkup(
                                category.name
                              )}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="difficulty-select-label">
                        Select Difficulty:
                      </InputLabel>
                      <Select
                        required
                        name="difficulty"
                        value={difficulty.id || ""}
                        id="difficulty-select"
                        label="Select Difficulty"
                        labelId="difficulty-select-label"
                        onChange={handleDifficultyChange}
                      >
                        {difficulties.map((difficulty) => (
                          <MenuItem key={difficulty.id} value={difficulty.id}>
                            {difficulty.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                 
                </Grid>
                <Button
                  className={classes.submitButton}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Start<PlayArrowIcon />
                </Button>
              </form>
        </>: <QuesOpt data={quizData} step={step} playerName={playerName}/>}
      </>
    )
}
export default Form