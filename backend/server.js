import express from 'express'
import cors from 'cors'

import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 8000;

app.use(cors);
app.use(express.json());

// Import APIs
const weatherRoutes = require('./routes/weather');
const financeRoutes = require('./routes/finance');
const newsRoutes = require('./routes/news');
// const fitnessRoutes = require('./routes/fitness');

// Route Handlers
app.use('/api/weather', weatherRoutes)
app.use('/api/finance', financeRoutes)
app.use('/api/news', newsRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})