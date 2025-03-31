import React from 'react'
import { useTheme } from '../context/ThemeContext'
import classes from './MainHeader.module.css';

const MainHeader = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={classes.header}>
      <h1>Mini Dashboard</h1>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </header>
  )
}

export default MainHeader