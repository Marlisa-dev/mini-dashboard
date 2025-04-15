import express from 'express';
import axios from 'axios';

const router = express.Router();
const API_KEY = process.env.STOCKS_API_KEY;

// 📈 Gainers & Losers
router.get('/gainers-losers', async (req, res) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'TOP_GAINERS_LOSERS',
        apikey: API_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gainers/losers' });
  }
});

// 🕵️ Insider Transactions
router.get('/insiders/:symbol', async (req, res) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'INSIDER_TRANSACTIONS',
        symbol: req.params.symbol,
        apikey: API_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch insider transactions' });
  }
});

// 📊 Real GDP
router.get('/gdp', async (req, res) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'REAL_GDP',
        interval: 'annual',
        apikey: API_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch GDP' });
  }
});

// 📉 Inflation
router.get('/inflation', async (req, res) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'INFLATION',
        apikey: API_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inflation data' });
  }
});

// 💰 Treasury Yields
router.get('/yields', async (req, res) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'TREASURY_YIELD',
        interval: 'monthly',
        maturity: '10year',
        apikey: API_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch treasury yields' });
  }
});

// 📁 ETF Profile
router.get('/etf/:symbol', async (req, res) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'ETF_PROFILE',
        symbol: req.params.symbol,
        apikey: API_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ETF profile' });
  }
});

export default router;
