import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {useDispatch} from 'react-redux';
import {setChanges} from '../../redux/actions/ui/ui';

export default function FormDialog({onSave}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    onSave(value);
    dispatch(setChanges(true));
    setOpen(false);
  };  

  return (
    <div>
      <Tooltip title="Add keyword">
        <IconButton onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nueva palabra clave</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Las palabras clave serán usadas para facilitar la búsqueda a los usuarios y permite al sistema filtrar información.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Palabra clave"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={(onSave)?handleSave:undefined} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
