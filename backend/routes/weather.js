import express from 'express';
import axios from 'axios';

const router = express.Router()
// console.log('API Key in Route 1', process.env.WEATHER_API_KEY)

router.get('/', async (req, res) => {
    try {
        const city = req.query.city || 'Dallas';
        const apiKey = process.env.WEATHER_API_KEY;

        console.log('API Key in Route 2', apiKey)

        // if(!apiKey) {
        //     throw new Error('APi Key is undefined')
        // }

        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&days=7`);

        // if (!response.ok) throw new Error(`WeatherAPI error: ${response.status}`);
        // const data = await response.json();
        res.json(response.data);
    }
    catch (error) {
        console.error('Error fetchin weather data:', error.message);
        // res.status(500).json({error: 'Failed to fetch weather data'});

    if (error.response) {
        res.status(error.response.status).json({error: error.response.data.error.message})
    } else {
        res.status(500).json({error: 'Failed to fetch weather data'})
    }
    }
});

export default router;