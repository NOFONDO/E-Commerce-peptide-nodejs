const { body } = require('express-validator');

const productValidator = [
  body('name').trim().notEmpty().withMessage('Product name is required').isLength({ max: 200 }),
  body('category').notEmpty().withMessage('Category is required').isMongoId().withMessage('Invalid category id'),
  body('price').notEmpty().withMessage('Price is required').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 5000 }),
  body('stockQuantity').notEmpty().withMessage('Stock quantity is required').isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer'),
  body('dosageInformation').optional().isLength({ max: 2000 }),
  body('warnings').optional().isLength({ max: 2000 }),
  body('isFeatured').optional().isBoolean().toBoolean(),
  body('isBestSeller').optional().isBoolean().toBoolean(),
  body('isAvailable').optional().isBoolean().toBoolean(),
];

module.exports = { productValidator };
