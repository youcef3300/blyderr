
const express = require('express');
const Property = require('../models/Property');

const router = express.Router();

// Create Property
router.post('/', async (req, res) => {
  const { name, location, price, sharesAvailable, dividends } = req.body;

  try {
    const newProperty = new Property({ name, location, price, sharesAvailable, dividends });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ error: 'Error creating property' });
  }
});

// Get All Properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching properties' });
  }
});

module.exports = router;
