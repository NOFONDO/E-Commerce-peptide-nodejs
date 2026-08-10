const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');
const { uploadMultipleBuffers } = require('../utils/cloudinaryUpload');

const getProducts = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    featured,
    bestSeller,
    inStock,
    minPrice,
    maxPrice,
    sort,
    page = 1,
    limit = 12,
  } = req.query;

  const query = {};

  if (search) {
    query.$text = { $search: search };
  }
  if (category) {
    query.category = category;
  }
  if (featured === 'true') {
    query.isFeatured = true;
  }
  if (bestSeller === 'true') {
    query.isBestSeller = true;
  }
  if (inStock === 'true') {
    query.stockQuantity = { $gt: 0 };
    query.isAvailable = true;
  }
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const sortOptions = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    'price-asc': { price: 1 },
    'price-desc': { price: -1 },
    'name-asc': { name: 1 },
    'name-desc': { name: -1 },
  };
  const sortQuery = sortOptions[sort] || { createdAt: -1 };

  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.min(Math.max(Number(limit), 1), 50);
  const skip = (pageNum - 1) * limitNum;

  const [products, total] = await Promise.all([
    Product.find(query).populate('category', 'name slug').sort(sortQuery).skip(skip).limit(limitNum),
    Product.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: products,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum) || 1,
    },
  });
});

const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate('category', 'name slug');
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  const relatedProducts = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  })
    .limit(4)
    .populate('category', 'name slug');

  res.status(200).json({ success: true, data: { product, relatedProducts } });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name slug');
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  res.status(200).json({ success: true, data: product });
});

const createProduct = asyncHandler(async (req, res) => {
  const files = req.files || [];
  if (files.length === 0) {
    throw new ApiError(400, 'At least one product image is required');
  }

  const images = await uploadMultipleBuffers(files);

  const benefits = req.body.benefits
    ? String(req.body.benefits).split(',').map((b) => b.trim()).filter(Boolean)
    : [];

  let specifications = [];
  if (req.body.specifications) {
    try {
      specifications = JSON.parse(req.body.specifications);
    } catch (err) {
      specifications = [];
    }
  }

  const product = await Product.create({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    benefits,
    specifications,
    dosageInformation: req.body.dosageInformation || '',
    warnings: req.body.warnings || undefined,
    images,
    stockQuantity: req.body.stockQuantity,
    isAvailable: req.body.isAvailable !== 'false',
    isFeatured: req.body.isFeatured === 'true',
    isBestSeller: req.body.isBestSeller === 'true',
  });

  res.status(201).json({ success: true, message: 'Product created successfully', data: product });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  const fields = [
    'name',
    'category',
    'price',
    'description',
    'dosageInformation',
    'warnings',
    'stockQuantity',
  ];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });

  if (req.body.benefits !== undefined) {
    product.benefits = String(req.body.benefits).split(',').map((b) => b.trim()).filter(Boolean);
  }

  if (req.body.specifications !== undefined) {
    try {
      product.specifications = JSON.parse(req.body.specifications);
    } catch (err) {
      // keep existing specifications if parsing fails
    }
  }

  if (req.body.isAvailable !== undefined) product.isAvailable = req.body.isAvailable === 'true' || req.body.isAvailable === true;
  if (req.body.isFeatured !== undefined) product.isFeatured = req.body.isFeatured === 'true' || req.body.isFeatured === true;
  if (req.body.isBestSeller !== undefined) product.isBestSeller = req.body.isBestSeller === 'true' || req.body.isBestSeller === true;

  const newFiles = req.files || [];
  if (newFiles.length > 0) {
    const newImages = await uploadMultipleBuffers(newFiles);
    product.images = [...product.images, ...newImages];
  }

  if (req.body.removeImagePublicIds) {
    const idsToRemove = JSON.parse(req.body.removeImagePublicIds);
    const imagesToDelete = product.images.filter((img) => idsToRemove.includes(img.publicId));
    await Promise.all(imagesToDelete.map((img) => cloudinary.uploader.destroy(img.publicId)));
    product.images = product.images.filter((img) => !idsToRemove.includes(img.publicId));
  }

  if (product.images.length === 0) {
    throw new ApiError(400, 'Product must have at least one image');
  }

  await product.save();

  res.status(200).json({ success: true, message: 'Product updated successfully', data: product });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  await Promise.all(product.images.map((img) => cloudinary.uploader.destroy(img.publicId)));
  await product.deleteOne();

  res.status(200).json({ success: true, message: 'Product deleted successfully' });
});

module.exports = {
  getProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
