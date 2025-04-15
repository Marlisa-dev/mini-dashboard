import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/crypto', async (req, res) => {
    try {
        const apiKey = process.env.CRYPTO_API_KEY
        const response = await axios.get(``);
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