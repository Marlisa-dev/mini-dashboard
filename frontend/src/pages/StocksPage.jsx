import { useState, useEffect} from 'react'
import GainersLosersTab from '../components/GainersLosersTab';
import InsiderTab from '../components/InsiderTab';
import GDPChartTab from '../components/GDPChartTab';
import InflationChartTab from '../components/InflationChartTab';
import TreasuryYieldTab from '../components/TreasuryYieldTab';
import ETFProfileTab from '../components/ETFProfileTab';
import HomeButton from '../components/HomeButton';

const StocksPage = () => {

  const [activeTab, setActiveTab] = useState('gainers');

  const tabs = [
    { key: 'gainers', label: 'Top Gainers & Losers' },
    { key: 'insiders', label: 'Insider Transactions' },
    { key: 'gdp', label: 'Real GDP' },
    { key: 'inflation', label: 'Inflation Rates' },
    { key: 'yield', label: 'Treasury Yields' },
    { key: 'etf', label: 'ETF Profiles' },
  ];

  return (
    <div className="stocks-page" style={{ padding: '1rem', width: '90vw', margin: 'auto' }}>
        <div className="stocks-page-header" style={{display: 'flex', justifyContent: 'space-between'}}>
            <h2 style={{ marginBottom: '1rem' }}>📊 Stock Tracker</h2>

            {/* 🔘 Tab Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {tabs.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                    padding: '8px 16px',
                    fontWeight: activeTab === tab.key ? 'bold' : 'normal',
                    borderRadius: '6px',
                    border: 'none',
                    background: activeTab === tab.key ? '#26c98e' : '#ccc',
                    color: activeTab === tab.key ? 'white' : 'black',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                    }}
                >
                    {tab.label}
                </button>
            ))}
            </div>
            <HomeButton />
        </div>

        <div className="stock-page-content">
            {/* 🧠 Dynamic Tab Content */}
            <div>
                {activeTab === 'gainers' && <GainersLosersTab />}
                {activeTab === 'insiders' && <InsiderTab />}
                {activeTab === 'gdp' && <GDPChartTab />}
                {activeTab === 'inflation' && <InflationChartTab />}
                {activeTab === 'yield' && <TreasuryYieldTab />}
                {activeTab === 'etf' && <ETFProfileTab />}
            </div>
        </div>

    </div>
  );
};

export default StocksPage