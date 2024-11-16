const express = require('express');
const Restaurant = require('../models/restaurant');

const router = express.Router();

// CRUD pour les restaurants
router.get('/', async (req, res) => res.json(await Restaurant.find()));
router.post('/', async (req, res) => res.status(201).json(await new Restaurant(req.body).save()));
router.put('/:id', async (req, res) => res.json(await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => res.json(await Restaurant.findByIdAndDelete(req.params.id)));

module.exports = router;
