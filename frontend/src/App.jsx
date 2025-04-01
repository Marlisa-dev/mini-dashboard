import {Routes, Route } from "react-router-dom"
import MainHeader from "./components/MainHeader.jsx"
import Dashboard from './pages/Dashboard.jsx'
import WeatherPage from './pages/WeatherPage.jsx'
import CryptoPage from './pages/CryptoPage.jsx'
import FitnessPage from './pages/FitnessPage.jsx'
import HabitPage from './pages/HabitPage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import StockPage from './pages/StockPage.jsx'
import ToDoPage from './pages/ToDoPage.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

function App() {
  return (
    <ThemeProvider >
        <MainHeader />
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/weather" element={<WeatherPage />}/>
          <Route path="/crypto" element={<CryptoPage />}/>
          <Route path="/fitness" element={<FitnessPage />}/>
          <Route path="/habit" element={<HabitPage />}/>
          <Route path="/news" element={<NewsPage />}/>
          <Route path="/stocks" element={<StockPage />}/>
          <Route path="/todos" element={<ToDoPage />}/>
        </Routes>
    </ThemeProvider>
  )
}

export default App