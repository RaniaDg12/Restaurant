const mongoose = require('mongoose');


const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  description: { type: String },           
  price: { type: Number, required: true }, 
  image: { type: String },
  category: { type: String },              
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
