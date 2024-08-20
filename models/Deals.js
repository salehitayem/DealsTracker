const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  vendorName: String,
  vendorNumber: String,
  dealNumber: String,
  excelFile: String,
  orderNumber: String,
  date: Date,
  status: {
    type: String,
    enum: ['open', 'supplied', 'partly supplied', 'cancel'],
    default: 'open'
  }
});

module.exports = mongoose.model('Deal', dealSchema);