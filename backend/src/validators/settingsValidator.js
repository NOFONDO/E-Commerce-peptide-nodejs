const { body } = require('express-validator');

const settingsValidator = [
  body('whatsappNumber').optional().trim().matches(/^\+?[0-9\s-]{7,20}$/).withMessage('Invalid WhatsApp number format'),
  body('contactEmail').optional().isEmail().withMessage('Invalid contact email'),
  body('storeDescription').optional().isLength({ max: 1000 }),
  body('socialLinks.instagram').optional().isString(),
  body('socialLinks.facebook').optional().isString(),
  body('socialLinks.twitter').optional().isString(),
  body('socialLinks.linkedin').optional().isString(),
];

module.exports = { settingsValidator };
