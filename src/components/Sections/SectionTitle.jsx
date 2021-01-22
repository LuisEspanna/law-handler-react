import { makeStyles } from '@material-ui/core/styles';
import MarkdownInput from '../CustomInput/MarkdownInput.jsx';
import SectionChapter from './SectionChapter.jsx';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../CustomButtons/Button';
import {templateChapter, templateMultimedia} from '../../utils';

import MultimediaInput from '../Multimedia/MultimediaInput.jsx';
import Multimedia from '../Multimedia/Multimedia.jsx';

import KeyWords from '../KeyWords/KeyWords';

//actions
import {removeTitle, updateTitle} from '../../redux/actions/titles/titles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    minWidth: 200,
    paddingTop:'30px',
  }
}));


export default function SectionTitle({title,showChildren}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const  {user}  = useSelector( state => state.users );

  const onDeleteTitle = (id) =>{
    dispatch(removeTitle(id));
  }

  const onSaveTitle = (value) =>{
    var updatedTitle = {...title};
    updatedTitle.titulo = value;    
    dispatch(updateTitle(updatedTitle));
  }

  const onSaveDescription = (value) =>{
    var updatedTitle = {...title};
    updatedTitle.descripcion = value;
    dispatch(updateTitle(updatedTitle));
  }

  const onNewChapter = () =>{
    var newTitle = {...title};
    newTitle.capitulos = [...newTitle.capitulos, templateChapter()];
    dispatch(updateTitle(newTitle));
  }

  const onNewMultimedia = () =>{
    var newTitle = {...title};
    if(!newTitle.multimedia)newTitle.multimedia = [];
    newTitle.multimedia = [...newTitle.multimedia, templateMultimedia()];
    dispatch(updateTitle(newTitle));
  }

  const onSaveMultimedia = (value, index) =>{
    var newTitle = {...title};
    newTitle.multimedia = newTitle.multimedia.map((val, i)=>{
      if(index === i)val=value;
      return val;
    });
    dispatch(updateTitle(newTitle));
  }

  const onDeleteMultimedia = (index) =>{
    var newTitle = {...title};
    newTitle.multimedia = newTitle.multimedia.filter((val, i)=>i !== index);
    dispatch(updateTitle(newTitle));
  }

  const onEditKeyWords = (keywords) =>{
    var newTitle = {...title};
    newTitle.keywords = keywords;
    dispatch(updateTitle(newTitle));
  }

  return (
    <div className={classes.root}>
      {
        showChildren?<Multimedia data={title.multimedia}/>:null
      }
      
      <MarkdownInput onSave={onSaveTitle} labelText={"Título"} data={title.titulo} onDelete={() => onDeleteTitle(title.id)}/>
      <MarkdownInput onSave={onSaveDescription} labelText={"Descripción Título"} data={title.descripcion} multiline/>
      
      {
        user && !showChildren?
        <>
          <KeyWords onChange={onEditKeyWords} data={title.keywords}/>
          <Button color="primary" onClick={onNewChapter}>Agregar capítulo</Button>
          <Button color="primary" onClick={onNewMultimedia}>Agregar Multimedia</Button>
        </>:
        null
      }

      {          
        title && showChildren && title.capitulos &&
        title.capitulos.map((chapter,i) => {
              return (
                <SectionChapter chapter={chapter} parent={title} key={i} showChildren={showChildren}/>
              )
          })
      }

      {          
        title && !showChildren && title.multimedia &&
        title.multimedia.map((data,i) => {
              return (
                <MultimediaInput onSave={onSaveMultimedia} labelText={'Multimedia'} key={i} index={i} data={data} onDelete={()=>onDeleteMultimedia(i)}/>
              )
          })
      }


    </div>
  );
}