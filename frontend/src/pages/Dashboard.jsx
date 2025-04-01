import React from 'react'
import FinanceTracker from '../components/FinanceTracker'
import FitnessTracker from '../components/FitnessTracker'
import HabitTracker from '../components/HabitTracker'
import NewsDashboard from '../components/NewsDashboard'
import ToDoList from '../components/ToDoList'
import Weather from '../components/Weather'
import classes from './Dashboard.module.css'
import { FaHeart } from "react-icons/fa";


const Dashboard = () => {
  return (
    <>
      <main className={classes.dashboard}>
        <Weather className={classes.card}/>
        <HabitTracker className={classes.card}/>
        <ToDoList className={classes.card}/>
        <FinanceTracker className={classes.card}/>
        <FitnessTracker className={classes.card}/>
        <NewsDashboard className={classes.card}/>
      </main>
      <div className={classes.footer}>
        <p>by <a href='https://x.com/eastramses' target='_blank'>@EastRamses</a></p>
        <FaHeart className={classes.footerIcon} style={{marginLeft: "4px"}}/>
      </div>
      
    </>



  )
}

export default Dashboard