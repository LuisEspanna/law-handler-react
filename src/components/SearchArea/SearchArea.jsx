import { makeStyles } from '@material-ui/core/styles';
import SearchField from './SearchField.jsx';
import ResultsArea from './ResultsArea.jsx';


const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(3),
      minWidth: 120,
      paddingTop:'30px',
    }
}));

export default function SearchArea() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <SearchField/>
        <ResultsArea/>
    </div>
  );
}