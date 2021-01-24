import react, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import LineChart from "../../components/Chart/LineChart.jsx";
import BarChart from "../../components/Chart/BarChart.jsx";

import {URL_BASE} from '../../urls';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    minWidth: 200,
    paddingTop:'30px',
  }
}));

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const colors = ["#D81B60", "#8E24AA", "#0D47A1", "#F57F17", "#607D8B"];


export default function SectionTitle() {
  const classes = useStyles();
  const [dataDaily, setDataDaily] = react.useState(undefined);

  const [dataProfessions, setDataProfessions] = react.useState(undefined);
  
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
          borderColor:colors[0],
          label:"Visitas",
          data: dailyData
        }]
      }, 
      monthly:{
        labels:monthlyLabels,
        datasets:[{
          borderColor:colors[0],
          label:"Visitas",
          data:monthlyData
        }]
      }
    });
  }

  const getDailyVisits = (res) => {

    var dailyLabels = []; 
    var currentDay = "";
    var professions = {};

    for (const key in res) {
      if (Object.hasOwnProperty.call(res, key)) {
        const visitor = res[key];
        var localLabel = new Date(visitor.date).toISOString().substring(0, 10);
        if (currentDay !== localLabel) {
          dailyLabels.push(localLabel);
          currentDay = localLabel;
        }

        if (!professions[visitor.profession]) {
          professions[visitor.profession] = {profession: visitor.profession};
        }
      }
    }

    var index = 0;
    var localDatasets = [];
    for (const key in professions) {
      if (Object.hasOwnProperty.call(professions, key)) {
        var profession = professions[key]; 
        professions[key] = filterByProfession(res, profession.profession, dailyLabels, index);
        localDatasets.push(professions[key]);
        index++;
      }
    }

    console.log(dailyLabels);
    console.log(professions);
    
    return {
      labels:dailyLabels,
      datasets:localDatasets
    }
  }

  const filterByProfession = (res, profession, dates, index) => {
    var dailyData = dates.map(date => 0); 
    var filteredList = [];
    
    for (const key in res) {
      if (Object.hasOwnProperty.call(res, key)) {
        const visitor = res[key];
        if (visitor.profession === profession) {
          filteredList.push(visitor);
        } 
      }
    }
   
    filteredList.map(visitor => {
      var localDate = new Date(visitor.date).toISOString().substring(0, 10);
      if(dates.findIndex(date => date === localDate) >= 0){
        dailyData[dates.findIndex(date => date === localDate)] += 1;
      }
      return visitor;
    });

    return {
      label:profession,
      backgroundColor:colors[index],
      borderColor:colors[index],
      data:dailyData, 
      fill:false
    }
  }  

  useEffect(() => {

    fetch(`${URL_BASE}/api/visitors`).then(res => {
      if (res.ok) return res.json();
    }).then(res => {
      setDataDaily(getSimpleDailyVisits(res));
      setDataProfessions(getDailyVisits(res));
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

      {
        dataProfessions?(
         <>
            <LineChart labels={dataProfessions.labels} datasets={dataProfessions.datasets} />
            <BarChart labels={dataProfessions.labels} datasets={dataProfessions.datasets}/>
         </>
        ):null
      }
    </div>
  );
}