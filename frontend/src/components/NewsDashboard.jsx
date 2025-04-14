import { useState, useEffect} from 'react'
import { getNews } from '../api/newsApi';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react'

import arrowAnimation from "../../assets/Arrow-Animation.json"

const NewsDashboard = ({className}) => {

  const [headlines, setHeadlines]= useState([])
  const [currentIndex, setCurrentIndex]= useState(0)

  const rawTitle = headlines[currentIndex]?.title || '';
  const cleanTitle = rawTitle.split(' - ').slice(0, -1).join(' - ') || rawTitle;
  // const sourceName = headlines[currentIndex]?.source?.name || '';


  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNews();
      console.log('News data in widget:', data);
      setHeadlines(data)
    }

    fetchNews();
  }, []);


// This is missing now in your code:
useEffect(() => {
  if (!headlines || headlines.length === 0) return;

  const interval = setInterval(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === headlines.length - 1 ? 0 : prevIndex + 1
    );
  }, 5000);

  return () => clearInterval(interval);
}, [headlines]);

  
  

  return (
    <div className="widget" style={{padding: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--card-bg)', borderRadius: '8px'}}>
      <div  className="news-content">
      <h2 style={{paddingBottom: '20px', textDecoration: 'underline'}}>Today's Top News</h2>
      {headlines.length > 0 ? (
        <div>
          <h4 style={{fontSize: '26px', paddingBottom: '16px'}}>{cleanTitle}</h4>
          <p style={{fontSize: '18px', color: '#f74545', fontWeight: 'bold'}}>{headlines[currentIndex]?.source?.name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      </div>


      <div className="cta">
        <h3 style={{marginTop: '10px' }}>Stay up to Date </h3>
        <Lottie 
        animationData={arrowAnimation}
        loop
        style={{width: 40, height: 40, }}
      />
      </div>

      



      <Link to="/news">
        <button  className="view-all-btn" >
          View More Headline News
        </button>
      </Link>

      </div>


  )
}

export default NewsDashboard