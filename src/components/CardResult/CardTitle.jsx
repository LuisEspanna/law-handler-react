import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '../CustomButtons/Button';
import Typography from '@material-ui/core/Typography';
import MarkdownInput from '../CustomInput/MarkdownInput.jsx';
import { Redirect } from "react-router-dom";


const useStyles = makeStyles({
  root: {
    
  },
  media: {
    height: 170,
  },
});

export default function CardTitle({serverData, onShowResult}) {
  const classes = useStyles();
  const [data, setData] = useState(0);
  const [onRedirect, setRedirect] = useState(false);

  const handleShowResult = () => {
    onShowResult();
    setRedirect(true);
  }

  useEffect(() => {
      
      var titulo = serverData.titulo;
      var descripcion = serverData.descripcion;
      var capitulos = ("Capitulos: " + (serverData.capitulos?serverData.capitulos.length:0));
      var imagen = undefined;

      if(serverData.multimedia){
          for (let i = 0; i < serverData.multimedia.length; i++) {
              if(serverData.multimedia[i].tipo === "imagen"){
                  imagen = serverData.multimedia[i].url;
                  break;
              }            
          }
      }

      setRedirect(false);

      setData({
          titulo,
          descripcion,
          capitulos,
          imagen
      });
    }, [serverData.titulo, serverData.descripcion, serverData.capitulos, serverData.multimedia, data.multimedia]);


  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleShowResult}>
        {
          data.imagen ? 
            <CardMedia
              className={classes.media}
              image={data.imagen}
            />:<div></div>
        }
        <CardContent>
          <MarkdownInput data={data.titulo}/>
          <MarkdownInput data={data.descripcion}/>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.capitulos}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary" simple onClick={handleShowResult}>
          Leer más
          {
            onRedirect?<Redirect to="/details" />:null
          }
        </Button>
      </CardActions>
    </Card>
  );
}
