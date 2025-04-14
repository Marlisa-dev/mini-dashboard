import express from 'express';
import axios from 'axios';

const router = express.Router();


router.get('/', async (req, res) => {
  const category = req.query.category || ''; // optional
  const apiKey = process.env.NEWS_API_KEY;

  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category: category,
        apiKey: apiKey,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error('News API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

export default router;
