const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: 'store_settings',
      unique: true,
    },
    whatsappNumber: {
      type: String,
      required: [true, 'WhatsApp number is required'],
      default: '+447346257943',
    },
    contactEmail: {
      type: String,
      required: [true, 'Contact email is required'],
      default: 'zepeptidebiotechnology@gmail.com',
    },
    storeDescription: {
      type: String,
      maxlength: 1000,
      default: 'Premium research peptides for laboratory use.',
    },
    socialLinks: {
      instagram: { type: String, default: '' },
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
