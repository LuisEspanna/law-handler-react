import React, { useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import Footer from "../../components/Footer/Footer.js";
import styles from "../../assets/jss/material-kit-react/views/components.js";

import SectionTitle from '../../components/Sections/SectionTitle.jsx';
import SectionChapter from '../../components/Sections/SectionChapter.jsx';
import SectionArticle from "../../components/Sections/SectionArticle.jsx";

import FloatActionButton from "../../components/CustomButtons/FloatActionButton.jsx";
import SearchIcon from '@material-ui/icons/Search';
//actions
import {startLoadingTitles, loadTitles} from '../../redux/actions/titles/titles.js';


const useStyles = makeStyles(styles);

const useStyles1 = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    minWidth: 200,
    paddingTop:'30px',
  }
}));


export default function Components(props) {
  const classes = useStyles();
  const customClasses = useStyles1();
  const { ...rest } = props;
  const dispatch = useDispatch();
  
  const  result  = useSelector( state => state.results.current_result);
  const  {user}  = useSelector( state => state.users );

  useEffect(() => {
    dispatch(loadTitles([]));
    dispatch(startLoadingTitles());
  },[dispatch]);

  return (
    <div>
      <Header
        brand="Law Handler"
        rightLinks={<HeaderLinks user={user}/>}
        fixed
        color="primary"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      
      <div className={classes.main}>
        {
            (result.data.tipo === "Titulo")?<SectionTitle title={result.data} showChildren={true}/>:null 
        }
        
        <div className={customClasses.root}>
          {
            (result.data.tipo === "Capitulo")?<SectionChapter chapter={result.data} parent={result.title} showChildren={true}/>:null 
          }
        </div>
            
        <div className={customClasses.root}>
          {
            (result.data.tipo === "Articulo")?<SectionArticle article={result.data} title={result.title} showChildren={true}/>:null 
          }
        </div>

      </div>
      <Footer />
      <FloatActionButton icon={<SearchIcon/>} link={"/search"} />
    </div>
  );
}
