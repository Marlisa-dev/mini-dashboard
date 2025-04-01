import React from 'react'
import { useTheme } from '../context/ThemeContext'
import classes from './MainHeader.module.css';
import { FaSun, FaMoon } from "react-icons/fa6";
const MainHeader = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className={classes.header}>
      <h1>Mini Dashboard</h1>
     
      <button onClick={toggleTheme} className={classes.toggleButton}>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>
    </header>
  )
}

export default MainHeader