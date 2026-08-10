const asyncHandler = require('../utils/asyncHandler');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Message = require('../models/Message');

const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalProducts,
    totalCategories,
    totalMessages,
    unreadMessages,
    featuredProducts,
    bestSellerProducts,
    outOfStockProducts,
    recentMessages,
    recentProducts,
  ] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    Message.countDocuments(),
    Message.countDocuments({ isRead: false }),
    Product.countDocuments({ isFeatured: true }),
    Product.countDocuments({ isBestSeller: true }),
    Product.countDocuments({ stockQuantity: 0 }),
    Message.find().sort({ createdAt: -1 }).limit(5),
    Product.find().sort({ createdAt: -1 }).limit(5).populate('category', 'name'),
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalProducts,
      totalCategories,
      totalMessages,
      unreadMessages,
      featuredProducts,
      bestSellerProducts,
      outOfStockProducts,
      recentMessages,
      recentProducts,
    },
  });
});

module.exports = { getDashboardStats };
