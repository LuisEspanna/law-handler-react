import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '../CustomButtons/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { Redirect } from "react-router-dom";

const useStyles = makeStyles({
  root: {
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 170,
  },
});

export default function SimpleCard({serverData, onShowResult}) {
    const classes = useStyles();

    const [data, setData] = useState(0);
    const [onRedirect, setRedirect] = useState(false);

    const handleShowResult = () => {
        onShowResult();
        setRedirect(true);
      }

    useEffect(() => {
        
        var titulo = serverData.data.titulo.replace("### ", "");
        var descripcion = serverData.data.descripcion.replace("### ","");
        var literales = ("Literales: " + (serverData.data.literales?serverData.data.literales.length:0));
        var paragrafos = ("Parágrafos: " + (serverData.data.paragrafos?serverData.data.paragrafos.length:0));
        var imagen = undefined;
        


        if(serverData.data.multimedia){
            for (let i = 0; i < serverData.data.multimedia.length; i++) {
                if(serverData.data.multimedia[i].tipo === "imagen"){
                    imagen = serverData.multimedia[i].url;
                    break;
                }            
            }
        }

        setData({
            titulo,
            descripcion,
            literales, 
            paragrafos,
            imagen,
        });
    }, [serverData.data.titulo, 
        serverData.data.descripcion, 
        serverData.data.literales,
        serverData.data.paragrafos,
        serverData.data.multimedia, 
        data.multimedia,        
        serverData.multimedia
    ]);

    return (
        <Card className={classes.root}>
        <CardActionArea onClick={handleShowResult}>
            {
                data.imagen?
                <CardMedia
                    className={classes.media}
                    image={data.imagen}
                />
                :<div></div>
            }  
            <CardContent>
                
                <Typography variant="subtitle1" component="p" gutterBottom>
                    {"Pertenece a: " + serverData.title.titulo.replace("## ", "")}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {data.titulo}
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                    {data.descripcion}
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                    {data.literales}
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                    {data.paragrafos}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button color="primary" simple onClick={handleShowResult} >
                Leer más
                {
                    onRedirect?<Redirect to="/details" />:null
                }
            </Button>
        </CardActions>  
        </Card>
    );
}
