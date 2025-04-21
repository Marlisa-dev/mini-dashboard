import { useEffect, useState } from 'react'
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { getGainersLosers } from '../../api/stocksApi';

import classes from './GainersLosersTab.module.css';

const GainersLosersTab = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [mostActivelyTraded, setMostActivelyTraded] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGainersLosers = async () => {
      setError(''); 
      try {
        const data = await getGainersLosers(); 
        if (data && data.top_gainers && data.top_losers && data.most_actively_traded) {
          setMostActivelyTraded(data.most_actively_traded);
          setGainers(data.top_gainers);
          setLosers(data.top_losers);
        } else {
          setError('Failed to fetch or parse gainers and losers data.');
        }
      } catch (err) {
        console.error("Error in fetchGainersLosers:", err); 
        setError('Failed to fetch gainers and losers data.');
      }
    };

    fetchGainersLosers();
  }, []);

  return (
    <>
          <div className={classes.gainersloserstab}>
      <div className={classes.table}>
      <h2>📈 Top Gainers</h2>
        <table>
          <tr>
            <th>Company Ticker</th>
            <th>Price</th>
            <th>Traded Volume</th>
            <th>% Gain</th>
          </tr>
          {gainers.length > 0 ? (
            gainers.map(item => (
              <tr key={item.ticker}>
                <td>{item.ticker}</td>
                <td>{item.price}</td>
                <td>{item.volume}</td>
                <td style={{ color: 'green' }}>
                  {parseFloat(item.change_percentage).toFixed(2)}%
                  <FaSortUp style={{ marginLeft: '6px', color: 'green' }} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Loading gainers...</td>
            </tr>
          )}
        </table>

      </div>
      
      <div className={classes.table}>
      <h2>📉 Top Losers</h2>
      <table>
          <tr>
            <th>Company Ticker</th>
            <th>Price</th>
            <th>Traded Volume</th>
            <th>% Loss</th>
          </tr>
          {losers.length > 0 ? (
            losers.map(item => (
              <tr key={item.ticker}>
                <td>{item.ticker}</td>
                <td>{item.price}</td>
                <td>{item.volume}</td>
                <td style={{ color: 'red' }}>
                {parseFloat(item.change_percentage).toFixed(2)}%
                  <FaSortDown style={{ marginLeft: '6px', color: 'red' }} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Loading losers...</td>
            </tr>
          )}
        </table>
      </div>
    </div>
    
      <div className={classes.activelytradedsection}>
      <div className={classes.activelytradedtable}>
      <h2>Most Actively Traded</h2>
      <table>
          <tr>
            <th>Company Ticker</th>
            <th>Price</th>
            <th>Change Amount</th>
            <th>Change Percentage</th>
            <th>Traded Volume</th>
          </tr>
            {mostActivelyTraded.length > 0 ? (
              mostActivelyTraded.map(item => (
                <tr key={item.ticker}>
                  <td>{item.ticker}</td>
                  <td>{item.price}</td>
                  <td>{item.change_amount}</td>
                  <td>{item.change_percentage}</td>
                  <td>{item.volume}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Loading most_actively_traded...</td>
              </tr>
            )}
          </table>
        </div>
      </div>
    </>
  )
}

export default GainersLosersTab