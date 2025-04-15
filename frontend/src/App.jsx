import {Routes, Route } from "react-router-dom"
import MainHeader from "./components/MainHeader.jsx"
import Dashboard from './pages/Dashboard.jsx'
import CryptoPage from './pages/CryptoPage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import StocksPage from "./pages/StocksPage.jsx"
import Footer from "./components/Footer.jsx"
import { ThemeProvider } from './context/ThemeContext.jsx'

function App() {
  return (
    <ThemeProvider >
        <MainHeader />
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/crypto" element={<CryptoPage />}/>
          <Route path="/news" element={<NewsPage />}/>
          <Route path="/stocks" element={<StocksPage />}/>
        </Routes>
        <Footer />
    </ThemeProvider>
  )
}

export default App