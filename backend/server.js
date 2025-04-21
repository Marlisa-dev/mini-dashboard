import dotenv from 'dotenv';
dotenv.config();

// const result = dotenv.config();
// console.log('🔍 dotenv result:', result);
// console.log('📦 process.env.STOCKS_API_KEY:', process.env.STOCKS_API_KEY);

import express from 'express';
import cors from 'cors';

// Import APIs
import weatherRoutes from './routes/weather.js'
import newsRoutes from './routes/news.js'
import stocksRoutes from './routes/stocks.js'


const app = express()
const PORT = process.env.PORT || 8000;

app.use(cors()); // Execute the cors middleware function
app.use(express.json());

// Route Handlers
app.use('/api/weather', weatherRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/stocks', stocksRoutes)

// Catch-all error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
