import react, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import LineChart from "../../components/Chart/LineChart.jsx";

import {URL_BASE} from '../../urls';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    minWidth: 200,
    paddingTop:'30px',
  }
}));

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function SectionTitle() {
  const classes = useStyles();

  //const [data, setData] = react.useState(undefined);

  const [dataDaily, setDataDaily] = react.useState(undefined);
/*
  const getSimpleDailyVisits = useCallback(() => {
    
    var dailyLabels = []; 
    var monthlyLabels = [];

    var dailyData = []; 
    var monthlyData = [];

    var currentDay = "";
    var currentMonth = "";

    var dailyCounter = 0;
    var monthCounter = 0;

    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const visitor = data[key];           
            //Daily counter
            if(currentDay !==    new Date(visitor.date).toISOString().substring(0,10)){
                dailyLabels.push(new Date(visitor.date).toISOString().substring(0,10));
                currentDay =     new Date(visitor.date).toISOString().substring(0,10);
                dailyData.push(dailyCounter);
                dailyCounter = 1;
            }else{
                dailyCounter += 1;
                dailyData[dailyData.length-1] = dailyCounter;
            }

            //Monthly counter
            if(currentMonth !==    months[new Date(visitor.date).getMonth()]){
                monthlyLabels.push(months[new Date(visitor.date).getMonth()]);
                currentMonth =     months[new Date(visitor.date).getMonth()];
                monthlyData.push(monthCounter);
                monthCounter = 1;
            }else{
                monthCounter += 1;
                monthlyData[monthlyData.length-1] = monthCounter;
            }
        }
    }

    setDataDaily(
    {
      daily:{
        labels:dailyLabels,
        datasets:[{
          label:"Visitas",
          data: dailyData
        }]
      }, 
      monthly:{
        labels:monthlyLabels,
        datasets:[{
          label:"Visitas",
          data:monthlyData
        }]
      }
    });
  
  }, [data, setDataDaily])
*/
  
  const getSimpleDailyVisits = (res) => {
    var dailyLabels = []; 
    var monthlyLabels = [];

    var dailyData = []; 
    var monthlyData = [];

    var currentDay = "";
    var currentMonth = "";

    var dailyCounter = 0;
    var monthCounter = 0;

    for (const key in res) {
        if (Object.hasOwnProperty.call(res, key)) {
            const visitor = res[key];           
            //Daily counter
            if(currentDay !==    new Date(visitor.date).toISOString().substring(0,10)){
                dailyLabels.push(new Date(visitor.date).toISOString().substring(0,10));
                currentDay =     new Date(visitor.date).toISOString().substring(0,10);
                dailyData.push(dailyCounter);
                dailyCounter = 1;
            }else{
                dailyCounter += 1;
                dailyData[dailyData.length-1] = dailyCounter;
            }

            //Monthly counter
            if(currentMonth !==    months[new Date(visitor.date).getMonth()]){
                monthlyLabels.push(months[new Date(visitor.date).getMonth()]);
                currentMonth =     months[new Date(visitor.date).getMonth()];
                monthlyData.push(monthCounter);
                monthCounter = 1;
            }else{
                monthCounter += 1;
                monthlyData[monthlyData.length-1] = monthCounter;
            }
        }
    }

    return(
    {
      daily:{
        labels:dailyLabels,
        datasets:[{
          label:"Visitas",
          data: dailyData
        }]
      }, 
      monthly:{
        labels:monthlyLabels,
        datasets:[{
          label:"Visitas",
          data:monthlyData
        }]
      }
    });
  }
  

  useEffect(() => {

    fetch(`${URL_BASE}/api/visitors`).then(res => {
      if (res.ok) return res.json();
    }).then(res => {
      setDataDaily(getSimpleDailyVisits(res));
    });
  
    //getSimpleDailyVisits();
    //console.log(data)
  },[setDataDaily]);

  return (
    <div className={classes.root}>
      {
        dataDaily?(
         <>
            <LineChart labels={dataDaily.daily.labels} datasets={dataDaily.daily.datasets} />
            <LineChart labels={dataDaily.monthly.labels} datasets={dataDaily.monthly.datasets} />
         </>
        ):null
      }
    </div>
  );
}