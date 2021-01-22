import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionChapter from '../../components/Accordion/AccordionChapter.jsx';
import SectionTitle from '../../components/Sections/SectionTitle.jsx';
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
    width: '100%',
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

export default function ControlledAccordions({title}) {
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
          <Typography className={classes.heading}>{title.titulo}</Typography>
          <Typography className={classes.secondaryHeading}>Capitulos: {title.capitulos?title.capitulos.length:0}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          <GridContainer className={classes.gridContainer}>
            <GridItem xs={12}>
              <SectionTitle title={title} showChildren={false}/>
            </GridItem>

            <GridItem xs={12}>
              { title.capitulos &&
                title.capitulos.map((chapter, i) => {
                  return( <AccordionChapter chapter={chapter} parent={title} key={i}/> )
                })
              }
            </GridItem>
          </GridContainer> 
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
