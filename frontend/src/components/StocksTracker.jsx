import { Link } from 'react-router-dom';

const StocksTracker = ({className}) => {
  return (
    
    <div className={className}>
      <Link to="/stocks">
        <button  className="view-stock-data" >
          View More Stock Data
        </button>
      </Link>
    </div>
  )
}

export default StocksTracker