import  { useState, useEffect } from 'react';
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import CustomInput from "../CustomInput/CustomInput";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import DialogDelete from '../CustomInput/DialogDeleteMarkdown.jsx';
import { useSelector, useDispatch} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import {setChanges} from '../../redux/actions/ui/ui';

const useStyles = makeStyles((theme) => ({
    textArea: {
      width: '100%'
    }, 
    button:{
        float:'right'
    },
    display:'inline-block'
}));  

export default function MultimediaInput({labelText, data, onDelete, onSave, index}){
    const classes = useStyles();
    const [value, setValue] = useState(data.url);
    const [type, setType] = useState(data.tipo);
    const  {user}  = useSelector( state => state.users );

    const dispatch = useDispatch();

    useEffect(() => {
        setValue(data.url);
        setType(data.tipo);
    },[data]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    const handleSave = () => {
        dispatch(setChanges(true));
        if(onSave)onSave({tipo:type, url:value}, index);
    };

    
    return (
        <GridContainer>
            <GridItem xs={2} >
                <InputLabel id="label">Tipo</InputLabel>
                <Select value={type} onChange={handleChangeType}>
                    <MenuItem value="imagen">Imagen</MenuItem>
                    <MenuItem value="video">Video</MenuItem>
                </Select>
            </GridItem>

            <GridItem xs={7}>
                <CustomInput
                    labelText={labelText}
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        autoComplete: "off"
                    }}
                    formControlProps={{
                        fullWidth: true
                    }}

                />
            </GridItem>
            

            <GridItem xs={1}>
                <Tooltip title="Save">
                    <IconButton onClick={handleSave} className={classes.button}>
                        <SaveIcon />
                    </IconButton>
                </Tooltip>
            </GridItem>
            <GridItem xs={1}>
                {
                    user ?
                        <>
                            {
                                onDelete ?
                                    <DialogDelete className={classes.button} onDelete={onDelete} /> :
                                    null
                            }
                        </> :
                        null
                }

            </GridItem>
        </GridContainer>
    );
}


