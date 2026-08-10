const express = require('express');
const {
  getProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { productValidator } = require('../validators/productValidator');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);

router.post('/', protect, upload.array('images', 8), productValidator, validate, createProduct);
router.put('/:id', protect, upload.array('images', 8), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
