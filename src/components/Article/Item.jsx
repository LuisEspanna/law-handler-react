
import { makeStyles } from '@material-ui/core/styles';
import MarkdownInput from '../CustomInput/MarkdownInput.jsx';
import KeyWords from '../KeyWords/KeyWords';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../CustomButtons/Button';

//actions
import {updateTitle} from '../../redux/actions/titles/titles';


const useStyles = makeStyles(() => ({
  root: {
    minWidth: 120,
    paddingTop:'30px',
  }
}));


export default function Item({data, title, chapterId, articleId, type}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const  {admin}  = useSelector( state => state.users );


  const onDelete = (id) =>{
    var newTitle = {...title};

    title.capitulos.map(capitulo => {
      if(capitulo.id === chapterId){
        capitulo.articulos = capitulo.articulos.map(articulo => {
          if(articulo.id === articleId){
            articulo.literales = articulo.literales.filter(literal => literal.id !== id);
            articulo.paragrafos = articulo.paragrafos.filter(paragrafo => paragrafo.id !== id);
          }
          return articulo;
        });
      }
      return capitulo;
    });

    dispatch(updateTitle(newTitle));
  }


  const onSaveTitle = (value) =>{
    var newTitle = {...title};

    title.capitulos.map(capitulo => {
      if(capitulo.id === chapterId){
        capitulo.articulos = capitulo.articulos.map(articulo => {
          if(articulo.id === articleId){
            if(type === 'literal' )
            articulo.literales = articulo.literales.map(literal => {
              if(literal.id === data.id){
                literal.titulo = value;
              }
              return literal;
            });
            else
            articulo.paragrafos = articulo.paragrafos.map(paragrafo => {
              if(paragrafo.id === data.id){
                paragrafo.titulo = value;
              }
              return paragrafo;
            });
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
          if(articulo.id === articleId){
            if(type === 'literal' )
            articulo.literales = articulo.literales.map(literal => {
              if(literal.id === data.id){
                literal.descripcion = value;
              }
              return literal;
            });
            else
            articulo.paragrafos = articulo.paragrafos.map(paragrafo => {
              if(paragrafo.id === data.id){
                paragrafo.descripcion = value;
              }
              return paragrafo;
            });

          }
          return articulo;
        });
      }
      return capitulo;
    });

    dispatch(updateTitle(newTitle));
  }

  
  const onDeleteNote = (index) =>{
    var newTitle = {...title};

    title.capitulos.map(capitulo => {
      if(capitulo.id === chapterId){
        capitulo.articulos = capitulo.articulos.map(articulo => {
          if(articulo.id === articleId){
            if(type === 'literal' )
            articulo.literales = articulo.literales.map(literal => {
              if(literal.id === data.id){
                literal.notas = literal.notas.filter((val, i)=> i!==index);
              }
              return literal;
            });
            else
            articulo.paragrafos = articulo.paragrafos.map(paragrafo => {
              if(paragrafo.id === data.id){
                paragrafo.notas = paragrafo.notas.filter((val, i)=> i!==index);
              }
              return paragrafo;
            });

          }
          return articulo;
        });
      }
      return capitulo;
    });

    dispatch(updateTitle(newTitle));
  }

  const onEditNote = (value, index) =>{
    var newTitle = {...title};

    title.capitulos.map(capitulo => {
      if(capitulo.id === chapterId){
        capitulo.articulos = capitulo.articulos.map(articulo => {
          if(articulo.id === articleId){
            if(type === 'literal' )
            articulo.literales = articulo.literales.map(literal => {
              if(literal.id === data.id){
                literal.notas = literal.notas.map((val, i)=> {
                  if(i === index) val = value;
                  return val;
                });
              }
              return literal;
            });
            else
            articulo.paragrafos = articulo.paragrafos.map(paragrafo => {
              if(paragrafo.id === data.id){
                paragrafo.notas = paragrafo.notas.map((val, i)=> {
                  if(i === index) val = value;
                  return val;
                });
              }
              return paragrafo;
            });

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

    title.capitulos.map(capitulo => {
      if(capitulo.id === chapterId){
        capitulo.articulos = capitulo.articulos.map(articulo => {
          if(articulo.id === articleId){
            if(type === 'literal' )
            articulo.literales = articulo.literales.map(literal => {
              if(literal.id === data.id){
                literal.keywords = keywords;
              }
              return literal;
            });
            else
            articulo.paragrafos = articulo.paragrafos.map(paragrafo => {
              if(paragrafo.id === data.id){
                paragrafo.keywords = keywords;
              }
              return paragrafo;
            });

          }
          return articulo;
        });
      }
      return capitulo;
    });

    dispatch(updateTitle(newTitle));
  }

  const onNewNote = () =>{
    var newTitle = {...title};

    title.capitulos.map(capitulo => {
      if(capitulo.id === chapterId){
        capitulo.articulos = capitulo.articulos.map(articulo => {
          if(articulo.id === articleId){
            if(type === 'literal' )
            articulo.literales = articulo.literales.map(literal => {
              if(literal.id === data.id){
                literal.notas = [...literal.notas, "**Nota agregada**"];
              }
              return literal;
            });
            else
            articulo.paragrafos = articulo.paragrafos.map(paragrafo => {
              if(paragrafo.id === data.id){
                paragrafo.notas = paragrafo.notas = [...paragrafo.notas, "**Nota agregada**"];
              }
              return paragrafo;
            });

          }
          return articulo;
        });
      }
      return capitulo;
    });

    dispatch(updateTitle(newTitle));
  }

  return (
    <div className={classes.root}>
      <MarkdownInput onSave={onSaveTitle} labelText={"Item"} data={data.titulo} onDelete={()=>onDelete(data.id)} />
      <MarkdownInput onSave={onSaveDescription} labelText={"Descripción Item"}  multiline data={data.descripcion} />
      {
        admin?
        <>
          <Button color="primary" onClick={onNewNote}>Agregar nota</Button>
        </>:
        null
      }
      

      {
        data.notas && 
        data.notas.map((nota, i) => {
          return (<MarkdownInput index={i} onSave={onEditNote} key={i} labelText={"Nota"} data={nota} onDelete={()=>onDeleteNote(i)} />)
        })
      }

      {
        admin?
        <>
          <KeyWords data={data.keywords} onChange={onEditKeyWords}/>
        </>:
        null
      }
    </div>
  );
}