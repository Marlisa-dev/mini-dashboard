import React, { createContext, useContext, useState, useEffect} from 'react'

// const storedTheme = localStorage.getItem('theme') || 'light';
const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(storedTheme)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme)
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);