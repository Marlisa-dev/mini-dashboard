import express from 'express';
import axios from 'axios';

const router = express.Router();

function isInvalidAlphaResponse(data) {
  return data.Note || data.Information || data['Error Message'];
}

// console.log(API_KEY)

// 📈 Gainers & Losers
router.get('/gainers-losers', async (req, res) => {
  const API_KEY = process.env.STOCKS_API_KEY;
  // console.log('💡 Using API key:', API_KEY); // 👈 TEMP DEBUG
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'TOP_GAINERS_LOSERS',
        apikey: API_KEY, // 👈 this must not be undefined
      },
    });

    const data = response.data;
    if (isInvalidAlphaResponse(data)) {
      return res.status(400).json({ error: 'API limit exceeded or invalid request' });
    }

    res.json(data);
  } catch (err) {
    console.error('Gainers/Losers Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch gainers/losers' });
  }
});

// 📊 Real GDP
router.get('/gdp', async (req, res) => {
  const API_KEY = process.env.STOCKS_API_KEY;
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'REAL_GDP',
        interval: 'annual',
        apikey: API_KEY,
      },
    });

    const data = response.data;
    if (isInvalidAlphaResponse(data)) {
      return res.status(400).json({ error: 'API limit exceeded or invalid request' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch GDP' });
  }
});

// 📉 Inflation
router.get('/inflation', async (req, res) => {
  const API_KEY = process.env.STOCKS_API_KEY;
  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'INFLATION',
        apikey: API_KEY,
      },
    });

    const data = response.data;
    if (isInvalidAlphaResponse(data)) {
      return res.status(400).json({ error: 'API limit exceeded or invalid request' });
    }

    res.json(data);
  } catch (err) {
    console.error('Inflation Data Fetch Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch inflation data' });
  }
});


// 📁 ETF Profile
router.get('/etf/:symbol', async (req, res) => {
  const API_KEY = process.env.STOCKS_API_KEY;
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'ETF_PROFILE',
        symbol: req.params.symbol,
        apikey: API_KEY,
      },
    });

    const data = response.data;
    // 🚨 Handle unexpected API responses
    if (!data || data.Note || data.Information || Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Invalid ETF or API limit exceeded' });
    }

    res.json(response.data);
  } catch (err) {
    console.error('ETF Profile Fetch Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch ETF profile' });
  }
});

export default router;
