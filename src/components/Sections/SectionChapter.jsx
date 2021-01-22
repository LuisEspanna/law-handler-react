import { makeStyles } from '@material-ui/core/styles';
import MarkdownInput from '../CustomInput/MarkdownInput.jsx';
import SectionArticle from './SectionArticle.jsx';
import KeyWords from '../KeyWords/KeyWords';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../CustomButtons/Button';

import {templateArticle} from '../../utils';

//actions
import {updateTitle} from '../../redux/actions/titles/titles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
    paddingTop:'30px',
    width:'100%',
  }
}));


export default function SectionChapter({chapter, parent, showChildren}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const  {user}  = useSelector( state => state.users );

  const onDeleteChapter = (id) =>{
    var title = {...parent};
    title.capitulos = parent.capitulos.filter(chapter => chapter.id !== id);
    dispatch(updateTitle(title));
  }

  const onSaveTitle = (value) =>{
    var title = {...parent};
    title.capitulos.map(capitulo => {
      if(capitulo.id === chapter.id){
        capitulo.titulo = value;
      }
      return capitulo;
    });
    
    dispatch(updateTitle(title));
  }

  const onSaveDescription = (value) =>{
    var title = {...parent};
    title.capitulos.map(capitulo => {
      if(capitulo.id === chapter.id){
        capitulo.descripcion = value;
      }
      return capitulo;
    });
    
    dispatch(updateTitle(title));
  }

  const onEditKeyWords = (keywords) =>{
    var title = {...parent};
    title.capitulos.map(capitulo => {
      if(capitulo.id === chapter.id){
        capitulo.keywords = keywords;
      }
      return capitulo;
    });
    
    dispatch(updateTitle(title));
  }

  const onNewArticle = () =>{
    var title = {...parent};
    title.capitulos.map(capitulo => {
      if(capitulo.id === chapter.id){
        capitulo.articulos = [...capitulo.articulos, templateArticle()];
      }
      return capitulo;
    });
    
    dispatch(updateTitle(title));
  }


  return (
    <div className={classes.root}>
      <MarkdownInput onSave={onSaveTitle} labelText={"Título capítulo"} data={chapter.titulo} onDelete={() => onDeleteChapter(chapter.id)}/>
      <MarkdownInput onSave={onSaveDescription} labelText={"Descripción capítulo"} data={chapter.descripcion} multiline/>
      {
        user && !showChildren?
        <>
          <KeyWords onChange={onEditKeyWords} data={chapter.keywords}/>
          <Button color="primary" onClick={onNewArticle}>Agregar artículo</Button>
        </>:
        null
      }
      
      {       
          chapter && showChildren &&
          chapter.articulos.map((articulo,i) => {
              return (
                <SectionArticle article={articulo} chapterId={chapter.id} title={parent} key={i} showChildren={showChildren}/>
              )
          })
      }
    </div>
  );
}