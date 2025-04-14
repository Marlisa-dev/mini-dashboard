import { useState, useEffect} from 'react'
import { getNewsByCategory } from '../api/newsApi';
import { Link } from 'react-router-dom';
// import Footer from '../components/Footer';

const categories = [
  '', 
  'business', 
  'entertainment', 
  'general',
  'health', 
  'science', 
  'sports', 
  'technology'
];

const NewsPage = () => {

  const [category, setCategory] = useState('')
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNewsByCategory(category);
      setArticles(data);
    }
    fetchNews();
  }, [category])
 

  return (

    <div className="news-page">

      <div className="news-page-header">
        <select
          className="news-filter"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled hidden>Select Category</option>
          <option value="">All</option>
            {categories
              .filter((cat) => cat !== '') // skip empty used above
              .map((cat, i) => (
                <option key={i} value={cat}>
                  {cat[0].toUpperCase() + cat.slice(1)}
                </option>
            ))}
        </select>

        <Link to="/">
          <button  className="back-home" >
            Back to Home
          </button>
        </Link>
      </div>

      <h2 style={{marginTop: '1.5rem', marginBottom: '1.5rem', textAlign: 'center', textDecoration: 'underline'}}>Today's Top News</h2>




      <div className="news-page-body">
        {articles.length === 0 ? (
          <p>Loading...</p>
        ) : (
          articles.map((article, i) => (
            <div key={i} className="news-card">
              <h3>{article.title.split(' - ').slice(0, -1).join(' - ')}</h3>
              <p><strong>Source: </strong>{article.source.name}</p>
              <p><strong>Author(s): </strong>{article.author}</p>
              <p><strong>Summary: </strong>{article.description}</p>
              <a href={article.url} target="_blank" rel="noreferrer" style={{textDecoration: 'none', fontWeight: 'bold', color: '#5283f7'}}>Read More →</a>
            </div>
          ))
        )}
      </div>
      {/* <Footer /> */}
      </div>
      
  )
}

export default NewsPage