import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SectionChapter from '../Sections/SectionChapter.jsx';
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import AccordionArticle from '../Accordion/AccordionArticle';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display:'inline-block'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  gridContainer:{
    width:'100%'
  }
}));

export default function AccordionChapter({chapter, parent}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{chapter.titulo}</Typography>
          <Typography className={classes.secondaryHeading}>Articulos: {chapter.articulos.length}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GridContainer className={classes.gridContainer}>
            <GridItem xs={12}>
              <SectionChapter chapter={chapter} parent={parent} showChildren={false}/>
            </GridItem>

            <GridItem xs={12}>
              {
                chapter.articulos.map((articulo,i) => {
                  return( <AccordionArticle article={articulo} chapterId={chapter.id} title={parent} key={i}/> )
                })
              }
            </GridItem>
          </GridContainer> 
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
