import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { getETFProfile } from '../../api/stocksApi'; // adjust path as needed

const ETFProfileChart = () => {
  const [symbol, setSymbol] = useState('QQQ');
  const [inputValue, setInputValue] = useState('');
  const [etfData, setEtfData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchETF = async (ticker) => {
    setLoading(true);
    setError('');
    try {
      const result = await getETFProfile(ticker);
      console.log("ETF Full Response:", result);
    
      if (!result || !result.sectors) {
        throw new Error('ETF data not available (rate limit or invalid symbol).');
      }
    
      setEtfData(result); // ✅ always set the data
      if (!result.sectors || result.sectors.length === 0) {
        setError('⚠️ No sector breakdown available for this ETF.');
      } else {
        setError('');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch ETF data');
      setEtfData(null);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchETF(symbol);
  }, []);

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    setSymbol(inputValue.trim().toUpperCase());
    fetchETF(inputValue.trim().toUpperCase());
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const chartData = etfData
    ? {
        labels: etfData.sectors.map(item => item.sector),
        datasets: [
          {
            label: 'Sector Weight (%)',
            data: etfData.sectors.map(item => parseFloat(item.weight)),
            backgroundColor: [
              '#26c98e',
              '#8e44ad',
              '#f39c12',
              '#3498db',
              '#e74c3c',
              '#1abc9c',
              '#2ecc71',
              '#e67e22',
              '#95a5a6',
              '#34495e',
            ],
            borderWidth: 1,
          },
        ],
      }
    : null;


  return (
    <>
      <h2  style={{ marginBottom: '1rem', marginTop: '1rem'}}>ETF Sector Allocation</h2>

      <div 
        style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          marginBottom: '1rem', 
          marginTop: '1rem', 
          width: '76vw', 
          marginLeft: 'auto', 
          marginRight: 'auto', 
          padding: '1rem', 
          justifyContent: 'space-between', 
          height: '60vh' }}>
      
        <div className="etf-data" style={{ width: '30%', display: 'flex', flexDirection: 'column', marginLeft:  '3rem', marginTop: '3rem' }}>
        
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem' }}>
            <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter ETF symbol (e.g., QQQ)"
            style={{ padding: '6px', width: '200px', height: '40px' }}
          />
            <button onClick={handleSearch} style={{ padding: '6px 10px', backgroundColor: '#26c98e', color: 'white', border: 'none', borderRadius: '4px' }}>
            GO
          </button> 
        </div>

        <div>
          <h3 style={{fontSize: '2rem'}}>ETF Stats</h3>
          <div className="etf-text" style={{lineHeight: '2rem', fontSize: '1.2rem', marginTop: '1rem'}}>
          {etfData && (
            <div>
              <p><strong>Expense Ratio:</strong> {etfData.net_expense_ratio}%</p> 
              <p><strong>Dividend Yield:</strong> {etfData.dividend_yield}%</p>
              <p><strong>Inception Date:</strong> {etfData.inception_date}</p>
              <p><strong>Portfolio Turnover:</strong> {etfData.portfolio_turnover}%</p>
              <p><strong>Leveraged?</strong> {etfData.leveraged}</p>
            </div>
          )}
          </div>
        </div>
      </div>

      <div className="eft-chart" style={{ width: '60%', alignItems: 'center' }}>
      {etfData?.sectors?.length > 0 && (
        <Pie 
          data={chartData} 
          options={{ 
            plugins: { 
              legend: { 
                position: 'right' } } }} />
      )}
      {error && <p style={{ color: 'orange' }}>{error}</p>}
      </div>
    </div>
    
    </>
    

  );
};

export default ETFProfileChart;
