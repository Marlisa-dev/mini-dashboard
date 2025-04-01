import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

// Import APIs
import weatherRoutes from './routes/weather.js'
import financeRoutes from './routes/finance.js'
import newsRoutes from './routes/news.js'


const app = express()
const PORT = process.env.PORT || 8000;

app.use(cors()); // Execute the cors middleware function
app.use(express.json());

// Route Handlers
app.use('/api/weather', weatherRoutes)
app.use('/api/finance', financeRoutes)
app.use('/api/news', newsRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
