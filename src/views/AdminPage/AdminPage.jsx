import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Header from '../../components/Header/Header';
import Button from '../../components/CustomButtons/Button';
import SaveIcon from '@material-ui/icons/Save';

//icons
import TitleIcon from '@material-ui/icons/PostAdd';
import ListIcon from '@material-ui/icons/ViewList';
import LawIcon from '@material-ui/icons/ViewQuilt';
import UsersIcon from '@material-ui/icons/Group';
import ChartIcon from '@material-ui/icons/InsertChart';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import styles from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
import {useSelector, useDispatch } from 'react-redux';
import AccordionTitle from '../../components/Accordion/AccordionTitle.jsx';
import {templateTitle} from '../../utils';

import { Link } from "react-router-dom";

import Snackbar from "../../components/Snackbar/Snackbar.jsx";
import SectionCharts from "../../components/Sections/SectionCharts.jsx";

//actions
import {addTitle, startUpload} from '../../redux/actions/titles/titles';
import {setChanges} from '../../redux/actions/ui/ui';
import {setUser} from '../../redux/actions/users/users';

const useStyles1 = makeStyles(styles);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    width:'100%',
    position:'fixed',

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    paddingTop:'50px',
  },
  content: {
    marginTop:'100px',
    padding: theme.spacing(3),
    flexGrow: 1,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const classes1 = useStyles1();
  const  titulos  = useSelector( state => state.titulos );
  const  {changes}  = useSelector( state => state.ui );
  const  {user}  = useSelector( state => state.users );
  const dispatch = useDispatch();

  const [currentSection, setCurrentSection] = React.useState("");


  const onNewTitle=()=>{
    dispatch(addTitle(templateTitle()));
  };

  const onSaveChanges=()=>{
      if(changes){
        dispatch(startUpload(titulos));
      }
      dispatch(setChanges(!changes));
  };

  const onLogout=()=>{
    dispatch(setUser(undefined));
  };

  const handleSection=(section)=>{
    setCurrentSection(section);
  };

  return (
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.appBar}>
                <Header
                  brand="ADMIN PAGE"
                  color="info"
                  rightLinks={
                      <List className={classes1.list}>
                          <ListItem className={classes1.listItem}>
                              <Button                                  
                                  className={classes1.navLink}
                                  color="transparent"
                                  onClick={onLogout}
                              >
                                  Cerrar sesión
                              </Button>
                          </ListItem>
                          <ListItem className={classes1.listItem}>
                              <Avatar>
                                  {user.username.substring(0,1)}
                              </Avatar>
                          </ListItem>
                      </List>
                  }
              />
            </div>
        
            <Drawer
                 className={classes.drawer}
                variant="permanent"
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                <List 
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Contenido de la página
                    </ListSubheader>
                    }
                >
                    <ListItem button onClick={onNewTitle}>
                        <ListItemIcon><TitleIcon /></ListItemIcon>
                        <ListItemText primary={"Agregar título"} />
                    </ListItem>

                    <ListItem button onClick={()=>handleSection("titulos")} >
                        <ListItemIcon><ListIcon /></ListItemIcon>
                        <ListItemText primary={"Listar títulos"} />
                    </ListItem>

                    <Link to={"/"}>
                        <ListItem button>
                        <ListItemIcon><LawIcon /></ListItemIcon>
                        <ListItemText primary={"Ver ley completa"} />
                        </ListItem>
                    </Link>
                    
                </List>
                <Divider />
                <List 
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Usuarios y permisos
                    </ListSubheader>
                    }
                >
                    <ListItem button>
                        <ListItemIcon><UsersIcon /></ListItemIcon>
                        <ListItemText primary={"Usuarios"} />
                    </ListItem>
                </List>

                <Divider />
                <List>
                    <ListItem button onClick={()=>handleSection("graficas")} >
                        <ListItemIcon><ChartIcon /></ListItemIcon>
                        <ListItemText primary={"Estadísticas"} />
                    </ListItem>
                </List>
                
                </div>
            </Drawer>

            <main className={classes.content}>  
            <Snackbar/>  
            {
                (currentSection === "titulos")?(
                    titulos && 
                    titulos.map((titulo, i) => {
                        return (
                            <AccordionTitle title={titulo} key={i}/>
                        )
                    })
                ):(currentSection === "graficas")?(
                    <SectionCharts/>
                ):null
            }   
                     
                   

            <Button size="lg" justIcon round color={changes?"primary":null} className={classes.fab} onClick={onSaveChanges}>
                <SaveIcon/>
            </Button>
            
            </main>
        </div>
  );
}
