const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const restaurantRoute = require('./routes/restaurantRoute');
const menuitemRoute = require('./routes/menuitemRoute');
const orderRoute = require('./routes/orderRoute');



const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/restaurantDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Routes
app.use('/orders', orderRoute); 
app.use('/restaurants', restaurantRoute);
app.use('/menu', menuitemRoute);

// Lancer le serveur
app.listen(5000, () => console.log('Server running on http://localhost:5000'));