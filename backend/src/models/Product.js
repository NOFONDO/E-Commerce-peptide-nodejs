const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: 5000,
    },
    benefits: {
      type: [String],
      default: [],
    },
    specifications: [
      {
        label: { type: String, trim: true, maxlength: 100 },
        value: { type: String, trim: true, maxlength: 300 },
        _id: false,
      },
    ],
    dosageInformation: {
      type: String,
      maxlength: 2000,
      default: '',
    },
    warnings: {
      type: String,
      maxlength: 2000,
      default: 'For laboratory research use only. Not for human consumption.',
    },
    images: {
      type: [imageSchema],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one product image is required',
      },
    },
    stockQuantity: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    researchUseOnly: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isBestSeller: 1 });
productSchema.index({ createdAt: -1 });

productSchema.pre('validate', function generateSlug(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = `${this.name}`
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .concat(`-${Math.random().toString(36).substring(2, 7)}`);
  }
  next();
});

productSchema.virtual('inStock').get(function inStock() {
  return this.stockQuantity > 0 && this.isAvailable;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
