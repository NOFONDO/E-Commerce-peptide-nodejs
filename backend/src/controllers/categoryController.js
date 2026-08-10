const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Category = require('../models/Category');
const Product = require('../models/Product');

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  const categoriesWithCount = await Promise.all(
    categories.map(async (cat) => {
      const productCount = await Product.countDocuments({ category: cat._id });
      return { ...cat.toObject(), productCount };
    })
  );
  res.status(200).json({ success: true, data: categoriesWithCount });
});

const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  res.status(200).json({ success: true, data: category });
});

const createCategory = asyncHandler(async (req, res) => {
  const existing = await Category.findOne({ name: new RegExp(`^${req.body.name}$`, 'i') });
  if (existing) {
    throw new ApiError(409, 'A category with this name already exists');
  }
  const category = await Category.create({
    name: req.body.name,
    description: req.body.description || '',
  });
  res.status(201).json({ success: true, message: 'Category created successfully', data: category });
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  if (req.body.name !== undefined) category.name = req.body.name;
  if (req.body.description !== undefined) category.description = req.body.description;
  await category.save();
  res.status(200).json({ success: true, message: 'Category updated successfully', data: category });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  const productCount = await Product.countDocuments({ category: category._id });
  if (productCount > 0) {
    throw new ApiError(400, 'Cannot delete a category that still has products assigned to it');
  }
  await category.deleteOne();
  res.status(200).json({ success: true, message: 'Category deleted successfully' });
});

module.exports = { getCategories, getCategoryBySlug, createCategory, updateCategory, deleteCategory };
