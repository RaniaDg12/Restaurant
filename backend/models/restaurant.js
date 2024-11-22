const mongoose = require('mongoose');
const MenuItem = require('./menuitem'); 

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
  openingHour: { type: String, required: true }, 
  closingHour: { type: String, required: true }, 
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
