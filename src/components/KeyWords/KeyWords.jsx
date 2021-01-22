import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import KeyWordDialog from "../KeyWords/KeyWordDialog.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:'50px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },

  box: {
    display:'inline-block'
  },
  floatButton:{
      float:'left',
      position:'relative'
  }
}));

export default function KeyWords({data, onChange}) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([]);

  useEffect(() => {
    if(data){
      setChipData([...data]);
    }
  },[data]);

  const addKeyword = (keyword) => {
    setChipData([...chipData, keyword]);
    onChange([...chipData, keyword]);
  }

  const handleDelete = (chipToDelete) => () => {
    setChipData(chipData.filter((chip) => chip !== chipToDelete));
    onChange(chipData.filter((chip) => chip !== chipToDelete));
  };

  return (
      <GridContainer className={classes.root}>
        <GridItem xs={11}>
            {chipData &&
            chipData.map((data, i) => {
                return (
                <div key={i} className={classes.box}>
                    <Chip
                        label={data}
                        onDelete={ handleDelete(data)}
                        className={classes.chip}
                    />
                </div>
                );
            })}
        </GridItem>

        <GridItem xs={1}>
            <KeyWordDialog className={classes.floatButton} onSave={addKeyword}/>
        </GridItem>
      </GridContainer>
  );
}
