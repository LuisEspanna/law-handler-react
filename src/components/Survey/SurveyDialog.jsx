import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from 'react-redux';
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/customCheckboxRadioSwitch.js";
import Button from '../CustomButtons/Button';

//Actions
import {setProfession} from '../../redux/actions/users/users';
import {startUploadProfession} from '../../redux/actions/users/users';


import Autocomplete from "./Autocomplete.jsx";

const useStyles = makeStyles(styles);

const professions = [
  "Derecho",
  "Ingeniería",
  "Salud",
  "Enseñanza",
  "Otro",
];

export default function SurveyDialog({onSave}) {
  //const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  const open = useSelector(state => state.users.profession)

  const handleChange = (event) => {
    if(professions.filter(p=> p === event.target.innerHTML).length === 1){
      setValue(event.target.innerHTML);
    }else{
      setValue(undefined);
    }    
  };

  const handleSend = () => {
    if(!value)alert("Debes seleccionar un área de profesión");
    else{
      dispatch(setProfession(value));
      dispatch(startUploadProfession(value));
    }
  };  

  return (
    <div>
      <Dialog open={!open?true:false} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Encuesta obligatoria</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para poder usar este sitio, es necesario que brinde algunos datos como su área de profesión.
          </DialogContentText>
          <p></p>
          <Autocomplete onSelect={handleChange} data={professions}/>
        </DialogContent>
        <DialogActions>
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  value?true:false
                }                
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{ checked: classes.checked }}
              />
            }            
            label="Acepto el tratamiento de datos"
          />
          <Button color="primary" onClick={handleSend} >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
