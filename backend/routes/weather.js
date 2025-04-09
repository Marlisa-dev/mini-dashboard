import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  const city = req.query.city || 'Dallas';
  const days = req.query.days || 3;
  const aqi = req.query.aqi || 'no';
  const alerts = req.query.alerts || 'no';
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
      params: {
        key: apiKey,
        q: city,
        days,
        aqi,
        alerts
      }
    });

    // ✅ Confirm forecast exists
    console.log('forecast.forecastday:', response.data.forecast?.forecastday);

    res.json(response.data);
  } catch (error) {
    console.error('Weather API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch weather forecast' });
  }
});

export default router;
