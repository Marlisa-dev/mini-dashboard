import React from 'react'
import NewsDashboard from '../components/NewsDashboard'
import ToDoList from '../components/ToDoList'
import WorldClock from '../components/WorldClock'
import Weather from '../components/Weather'
import StocksTracker from '../components/StocksTracker'
import CryptoTracker from '../components/CryptoTracker'


import classes from './Dashboard.module.css'

// import Footer from '../components/Footer'


const Dashboard = () => {
  return (
    <>
      <main className={classes.dashboard}>
        <Weather className={classes.card}/>
        <ToDoList className={classes.card}/>
        <WorldClock  className={classes.card}/>
        <StocksTracker className={classes.card}/>
        <CryptoTracker   className={classes.card}/>
        <NewsDashboard className={classes.card}/>
      </main>
      {/* <div className={classes.footer}>
        <p>by <a href='https://x.com/eastramses' target='_blank'>@EastRamses</a></p>
        <FaHeart className={classes.footerIcon} style={{marginLeft: "4px"}}/>
      </div> */}

    </>



  )
}

export default Dashboard