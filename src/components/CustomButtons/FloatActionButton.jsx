import React from 'react';
import Button from '../../components/CustomButtons/Button';
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: "4"
    },
}));

export default function FloatActionButton({icon, event, link}) {

    const classes = useStyles();
    const [child, setChild] = React.useState(undefined);

    const handleClick = ()=>{
        if(link)setChild(<Redirect to={link} />);
    }

    return (
        <Button size="lg" justIcon round color="primary" className={classes.fab} onClick={event?event:handleClick} >
            {icon}
            {child}
        </Button>
    );
}
