const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Vendor = require('../models/Vendor');

// Get all vendors
router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add new vendor (protected)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'vendor') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  const { name, specialty, location, description, image } = req.body;

  try {
    const newVendor = new Vendor({
      userId: req.user.id,
      name,
      specialty,
      location,
      description,
      image
    });

    const vendor = await newVendor.save();
    res.json(vendor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;