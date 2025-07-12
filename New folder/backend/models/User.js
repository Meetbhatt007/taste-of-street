const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['customer', 'vendor'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true
  },
  businessName: String,
  stallType: String,
  stallLocation: String,
  paymentMethod: String,
  paymentDetails: String,
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('pin')) return next();
  this.pin = await bcrypt.hash(this.pin, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);