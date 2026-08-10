const asyncHandler = require('../utils/asyncHandler');
const Settings = require('../models/Settings');

const getSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne({ key: 'store_settings' });
  if (!settings) {
    settings = await Settings.create({ key: 'store_settings' });
  }
  res.status(200).json({ success: true, data: settings });
});

const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne({ key: 'store_settings' });
  if (!settings) {
    settings = new Settings({ key: 'store_settings' });
  }

  const { whatsappNumber, contactEmail, storeDescription, socialLinks } = req.body;

  if (whatsappNumber !== undefined) settings.whatsappNumber = whatsappNumber;
  if (contactEmail !== undefined) settings.contactEmail = contactEmail;
  if (storeDescription !== undefined) settings.storeDescription = storeDescription;
  if (socialLinks !== undefined) {
    settings.socialLinks = { ...settings.socialLinks.toObject(), ...socialLinks };
  }

  await settings.save();

  res.status(200).json({ success: true, message: 'Settings updated successfully', data: settings });
});

module.exports = { getSettings, updateSettings };
