const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const restaurantRoute = require('./routes/restaurantRoute');
const menuitemRoute = require('./routes/menuitemRoute');
const orderRoute = require('./routes/orderRoute');


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/orders', orderRoute); 
app.use('/restaurants', restaurantRoute);
app.use('/menu', menuitemRoute);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on http://localhost:5000'));