
const express = require('express');
const Investment = require('../models/Investment');
const Property = require('../models/Property');
const User = require('../models/User');

const router = express.Router();

// Purchase Shares
router.post('/purchase', async (req, res) => {
  const { userId, propertyId, shares } = req.body;

  try {
    const property = await Property.findById(propertyId);
    if (property.sharesAvailable < shares) return res.status(400).json({ error: 'Not enough shares available' });

    const newInvestment = new Investment({ user: userId, property: propertyId, shares });
    await newInvestment.save();

    property.sharesAvailable -= shares;
    await property.save();

    const user = await User.findById(userId);
    user.investments.push(newInvestment);
    await user.save();

    res.status(201).json(newInvestment);
  } catch (error) {
    res.status(500).json({ error: 'Error purchasing shares' });
  }
});

// Calculate Dividends (This is a simplified example)
router.get('/dividends/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('investments');
    let totalDividends = 0;

    for (const investment of user.investments) {
      const property = await Property.findById(investment.property);
      totalDividends += investment.shares * property.dividends;
    }

    res.json({ totalDividends });
  } catch (error) {
    res.status(500).json({ error: 'Error calculating dividends' });
  }
});

module.exports = router;
