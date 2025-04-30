import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const stocksData = ["Top Gainers and Losers", "Real GDP", "Most Actively Traded Stocks", "Inflation Rates", "ETF Profiles"]

const StocksTracker = ({className}) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = stocksData[index];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(current.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 50);
    } else {
      timer = setTimeout(() => {
        setText(current.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
    }

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => setIsDeleting(true), 1000);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % stocksData.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, index]);



  return (
    
    <div className={className} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", paddingTop: '2rem', paddingBottom: '2rem'}}>
      <div className="flash-data">
        <h3 style={{ textAlign: 'center', height: '40px', fontSize: '3.6rem', color: 'var(--text-color)'}}>
          {text}
          <span style={{ borderRight: '2px solid #26c98e', marginLeft: '2px' }}></span>
        </h3>
      </div>

      <div className="stocks-page-button" style={{textAlign: "center"}}>
        <Link to="/stocks">
          <button  
            className="view-stock-data" 
            style={{
              backgroundColor: "#2a77ea",
              outline: "none",
              padding: "10px 20px",
              border: "none",
              color: "#fff",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",


            }}>
            View Detailed Stock Data
          </button>
        </Link>
      </div>

    </div>
  )
}

export default StocksTracker