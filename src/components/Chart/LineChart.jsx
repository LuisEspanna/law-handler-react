import  React, { useState, useEffect } from 'react';
import Chart from "chart.js";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    paper:{
        margin:theme.spacing(3),
        padding:theme.spacing(3)
    }
}));  

export default function LineChart({labels, datasets}){
    const classes = useStyles();
    const [chartRef] = useState(React.createRef());

    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels,
                datasets,
            },
            options: {
                //Customize chart options
            }
        });
    },[labels, datasets, chartRef]);


    
    return (
        <Paper elevation={3} className={classes.paper}>
            <canvas
                id="lineChart"
                ref={chartRef}
            />
        </Paper >
    )
}


