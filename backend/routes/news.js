import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const apiKey = process.env.NEWS_API_KEY
        console.log(NEWS_API_KEY)
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&category=business&category=technology`);
        res.json(response.data);
    }
    catch (error) {
        console.error('Error getching news data:', error.message)
    }
    if (error.response) {
        res.status(error.response.status).json({error: error.response.data.error.message})
    } else {
        res.status(500).json({error: 'Failed to fetch weather data'})
        }
    } 
);

export default router;