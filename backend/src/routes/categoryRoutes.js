const express = require('express');
const {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { categoryValidator } = require('../validators/categoryValidator');

const router = express.Router();

router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);

router.post('/', protect, categoryValidator, validate, createCategory);
router.put('/:id', protect, categoryValidator, validate, updateCategory);
router.delete('/:id', protect, deleteCategory);

module.exports = router;
