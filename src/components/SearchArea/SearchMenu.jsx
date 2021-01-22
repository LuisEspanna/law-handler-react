import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

import IconButton from '@material-ui/core/IconButton';

import TitleIcon from '@material-ui/icons/Title';
import ChapterIcon from '@material-ui/icons/Class';
import ArticleIcon from '@material-ui/icons/FontDownload';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function SearchMenu({onSelect}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={()=>onSelect("Titulo")}>
          <ListItemIcon>
            <TitleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Títulos" />
        </StyledMenuItem>

        <StyledMenuItem onClick={()=>onSelect("Capitulo")}>
          <ListItemIcon>
            <ChapterIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Capítulos" />
        </StyledMenuItem>

        <StyledMenuItem onClick={()=>onSelect("Articulo")}>
          <ListItemIcon>
            <ArticleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Artículos" />
        </StyledMenuItem>

        <StyledMenuItem onClick={()=>onSelect("")}>
          <ListItemText primary="Todo" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}