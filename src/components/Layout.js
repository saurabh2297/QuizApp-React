import {Paper,Container,} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { styles } from "../helpers";
import Form from './Form'
import NavBar  from './Navbar'

const useStyles = makeStyles((theme) => {
    return styles;
});

//Layout component :- this layout is used for whole Application

const Layout = () => {
    const classes = useStyles();
    const step = 'start'; //step to decide which component to render 
    return (
        <>
        <NavBar />
        <Container>
        <Paper className={classes.paper}> 
            <Form step={step}/> 
        </Paper>
      </Container>
      </>
    )
}

export default Layout
