import express from 'express';
import axios from 'axios';

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const city = req.query.city || 'Dallas';
        const apiKey = process.env.WEATHER_API_KEY;

        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);

        res.json(response.data);
    }
    catch (error) {
        console.error('Error fetching weather data:', error.message);

    if (error.response) {
        res.status(error.response.status).json({error: error.response.data.error.message})
    } else {
        res.status(500).json({error: 'Failed to fetch weather data'})
    }
    }
});

export default router;