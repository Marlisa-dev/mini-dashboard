import React from 'react'
import NewsDashboard from '../components/NewsDashboard'
import WorldClock from '../components/WorldClock'
import Weather from '../components/Weather'
import StocksTracker from '../components/StocksTracker'

import classes from './Dashboard.module.css'

const Dashboard = () => {
  return (
    <>
      <main className={classes.dashboard}>
        <Weather className={classes.card}/>
        <WorldClock  className={classes.card}/>
        <StocksTracker className={classes.card}/>
        <NewsDashboard className={classes.card}/>
      </main>
    </>

  )
}

export default Dashboard