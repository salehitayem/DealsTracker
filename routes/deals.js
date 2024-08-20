const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Deal = require('../models/Deals')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('excelFile'), async (req, res) => {
  try {
    const deal = new Deal({
      vendorName: req.body.vendorName,
      vendorNumber: req.body.vendorNumber,
      dealNumber: req.body.dealNumber,
      excelFile: req.file.filename,
      orderNumber: req.body.orderNumber,
      date: req.body.date
    });

    await deal.save();
    res.redirect('/deals');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const deals = await Deal.find();
    res.render('deals', { deals });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    await Deal.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.redirect('/deals');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;