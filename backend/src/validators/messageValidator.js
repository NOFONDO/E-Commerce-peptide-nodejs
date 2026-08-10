const { body } = require('express-validator');

const messageValidator = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 150 }),
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('phone').optional().trim().isLength({ max: 30 }),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 3000 }),
];

module.exports = { messageValidator };
