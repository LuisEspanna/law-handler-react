
import { makeStyles } from '@material-ui/core/styles';
import MarkdownInput from '../CustomInput/MarkdownInput.jsx';
import Button from '../CustomButtons/Button';
import Item from '../Article/Item.jsx';
import KeyWords from '../KeyWords/KeyWords';

import {templateItem} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';

//actions
import {updateTitle} from '../../redux/actions/titles/titles';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
    paddingTop:'30px',
    width:'100%'
  },
}));


export default function SectionArticle({article, chapterId, title, showChildren}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const  {user}  = useSelector( state => state.users );

  const onDeleteArticle = (id) =>{
    var newTitle = {...title};

    if(title){
      title.capitulos.map(capitulo => {
        if(capitulo.id === chapterId){
          capitulo.articulos = capitulo.articulos.filter(articulo => articulo.id !== id);
        }
        return capitulo;
      });
    }

    dispatch(updateTitle(newTitle));
  }

  const onSaveTitle = (value) =>{
    var newTitle = {...title};

    title.capitulos.map(capitulo => {
      if(capitulo.id === chapterId){
        capitulo.articulos = capitulo.articulos.map(articulo => {

          if(articulo.id === article.id){
            articulo.titulo = value;
          }

          return articulo;
        });
      }
      return capitulo;
    });

    dispatch(updateTitle(newTitle));
  }

  const onSaveDescription = (value) =>{
    var newTitle = {...title};

    title.capitulos.map(capitulo => {
      if(capitulo.id === chapterId){
        capitulo.articulos = capitulo.articulos.map(articulo => {

          if(articulo.id === article.id){
            articulo.descripcion = value;
          }

          return articulo;
        });
      }
      return capitulo;
    });

    dispatch(updateTitle(newTitle));
  }

  const onEditKeyWords = (keywords) =>{
    var newTitle = {...title};
    
    newTitle.capitulos.map(capitulo => {
      if(capitulo.id === chapterId){
        capitulo.articulos = capitulo.articulos.map(articulo => {
          if(articulo.id === article.id){
            articulo.keywords = keywords;
          }
          return articulo;
        });
      }
      return newTitle;
    });
    
    dispatch(updateTitle(title));
  }


  const onNewLiteral = () =>{
    var newTitle = {...title};
    console.log("literal");
    
    newTitle.capitulos.map(capitulo => {
      if(capitulo.id === chapterId){
        capitulo.articulos = capitulo.articulos.map(articulo => {
          if(articulo.id === article.id){
            articulo.literales = [...articulo.literales, templateItem("### Nuevo literal") ];
          }
          return articulo;
        });
      }
      return newTitle;
    });
    
    dispatch(updateTitle(title));
  }

  const onNewParagraph = () =>{
    var newTitle = {...title};
    console.log("Para");
    newTitle.capitulos.map(capitulo => {
      if(capitulo.id === chapterId){
        capitulo.articulos = capitulo.articulos.map(articulo => {
          if(articulo.id === article.id){
            articulo.paragrafos = [...articulo.paragrafos, templateItem("### Nuevo parágrafo") ];
          }
          return articulo;
        });
      }
      return newTitle;
    });
    
    dispatch(updateTitle(title));
  }

  const onNewNote = () =>{
    var newTitle = {...title};
    newTitle.capitulos.map(capitulo => {
      if(capitulo.id === chapterId){
        capitulo.articulos = capitulo.articulos.map(articulo => {
          if(articulo.id === article.id){
            if(!articulo.notas)articulo.notas=[];
            articulo.notas = [...articulo.notas, "**Nota agregada**" ];
          }
          return articulo;
        });
      }
      return newTitle;
    });
    
    dispatch(updateTitle(title));
  }

  const onDeleteNote = (index) =>{
    var newTitle = {...title};
    newTitle.capitulos.map(capitulo => {
      if(capitulo.id === chapterId){
        capitulo.articulos = capitulo.articulos.map(articulo => {
          if(articulo.id === article.id){
            articulo.notas = articulo.notas.filter((val, i)=> i!==index);
          }
          return articulo;
        });
      }
      return newTitle;
    });
    
    dispatch(updateTitle(title));
  }

  const onEditNote = (value, index) =>{
    var newTitle = {...title};
    newTitle.capitulos.map(capitulo => {
      if(capitulo.id === chapterId){
        capitulo.articulos = capitulo.articulos.map(articulo => {
          if(articulo.id === article.id){
            articulo.notas = articulo.notas.map((val, i)=> {
              if(i === index) val = value;
              return val;
            });
          }
          return articulo;
        });
      }
      return newTitle;
    });
    
    dispatch(updateTitle(title));
  }

  

  return (
    <div className={classes.root}>
      <MarkdownInput onSave={onSaveTitle} labelText={"Título artículo"} data={article.titulo} onDelete={() =>onDeleteArticle(article.id)}/>
      <MarkdownInput onSave={onSaveDescription} labelText={"Descripción artículo"}  multiline data={article.descripcion} />
      {
        user && !showChildren?
        <>
          <KeyWords data={article.keywords} onChange={onEditKeyWords}/>
          <Button color="primary" onClick={onNewNote}>Agregar Nota</Button>
          <Button color="primary" onClick={onNewLiteral}>Agregar literal</Button>
          <Button color="primary" onClick={onNewParagraph}>Agregar Parágrafo</Button>
        </>:
        null
      }

      {
        article.notas &&
        article.notas.map((nota,i) => {
          return (<MarkdownInput index={i} onSave={onEditNote} key={i} labelText={"Nota"} data={nota} onDelete={()=>onDeleteNote(i)} />)
        })
      }

      {
        article.literales &&
        article.literales.map((literal,i) => {
          return (<Item type={'literal'} data={literal}  key={i} articleId={article.id} chapterId={chapterId} title={title}/>)
        })
      }

      {
        article.paragrafos &&
        article.paragrafos.map((paragrafo,i) => {
          return (<Item type={'paragrafo'} data={paragrafo} key={i} articleId={article.id} chapterId={chapterId} title={title}/>)
        })
      }
    </div>
  );
}