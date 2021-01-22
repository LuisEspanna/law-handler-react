import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import Footer from "../../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Parallax from "../../components/Parallax/Parallax.js";

import styles from "../../assets/jss/material-kit-react/views/components.js";

import imageBackground from "../../assets/img/bg3.jpg";
import SearchArea from "../../components/SearchArea/SearchArea.jsx";

import { useSelector } from 'react-redux';

const useStyles = makeStyles(styles);


const newStyles = makeStyles((theme) => ({
    panel: {
      backgroundColor:"rgba(0,0,0,0.8)",
      borderRadius:'0.5em'
    },
  }));
  

export default function Components(props) {
  const classes = useStyles();
  const customClasses = newStyles();
  const { ...rest } = props;

  const  {user}  = useSelector( state => state.users );

  return (
    <div>
      <Header
        brand="Law Handler"
        rightLinks={<HeaderLinks user={user}/>}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image={imageBackground}>
        <div className={classes.container}>
          <GridContainer className={customClasses.panel}>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Ley 842 de 2003</h1>
                <h3 className={classes.subtitle}>
                  Buscador
                </h3>
                <p>
                  Selecciona el tipo de busqueda y escribe en el cuadro de diálogo.
                </p>
                <p> .</p>
                
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <SearchArea/>
      </div>
      <Footer />
    </div>
  );
}
