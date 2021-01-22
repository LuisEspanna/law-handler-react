import  { useState, useEffect } from 'react';
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import CustomInput from "./CustomInput.js";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import DialogDelete from './DialogDeleteMarkdown.jsx';
import { useSelector, useDispatch} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';

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

export default function MarkdownInput({multiline, labelText, data, onDelete, maxWidth, onSave, index}){
    const classes = useStyles();
    const [value, setValue] = useState(data);
    const [edit, setEdit] = useState(false);
    const [width, setWidth] = useState(12);
    const [defaultWidth, setDefaultWidth] = useState(12);
    const  {user}  = useSelector( state => state.users );

    const dispatch = useDispatch();

    useEffect(() => {
        (maxWidth)?setDefaultWidth(maxWidth):setDefaultWidth(12);
        setValue(data);
    },[maxWidth, data]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleEdit = () => {
        setEdit(true);
        setWidth(defaultWidth/2);
    };

    const handleSave = () => {
        dispatch(setChanges(true));
        setEdit(false);
        setWidth(defaultWidth);
        if(onSave)onSave(value, index);
    };

    
    return (
        <GridContainer>
            {   edit?
                !multiline?
                <GridItem xs={width}>
                    <CustomInput
                        labelText={labelText}
                        id="float"
                        inputProps={{
                            value: value,
                            onChange:handleChange,
                            autoComplete: "off"
                        }}
                        formControlProps={{
                            fullWidth: true
                        }}    
                                            
                    />
                </GridItem>:
                <GridItem xs={width}>
                    <TextField
                        className={classes.textArea}
                        id="outlined-multiline-static"
                        label={labelText}
                        multiline
                        variant="outlined"
                        value={value}
                        onChange={handleChange}
                    />
                </GridItem>:<div></div>
            }
            
            
            <GridItem 
                xs 
                sm={(edit)?5:onDelete?defaultWidth-2:defaultWidth-1}>
                <ReactMarkdown children={value} plugins={[[gfm, {singleTilde: false}]]}/>
            </GridItem>

            {
                edit?
                <GridItem xs={1}>
                    <Tooltip title="Save">
                        <IconButton onClick={handleSave} className={classes.button}>
                            <SaveIcon />
                        </IconButton>
                    </Tooltip>
                </GridItem>:
                <GridItem xs={onDelete?2:1}>
                    {
                        user?
                        <>
                            {
                                onDelete?
                                <DialogDelete className={classes.button} onDelete={onDelete}/>:
                                null
                            }
                            <Tooltip title="Edit">
                                <IconButton onClick={handleEdit} className={classes.button}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </>:
                        null
                    }
                    
                    
                </GridItem>
            }
        </GridContainer>
    );
}


