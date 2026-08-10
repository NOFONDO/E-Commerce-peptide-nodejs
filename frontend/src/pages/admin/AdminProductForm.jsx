import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Loader from '../../components/common/Loader';
import ImageUploadGrid from '../../components/admin/ImageUploadGrid';
import { createProduct, fetchProductById, updateProduct } from '../../api/products';
import { fetchCategories } from '../../api/categories';

const emptySpec = { label: '', value: '' };

const AdminProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [existingImages, setExistingImages] = useState([]);
  const [removedImageIds, setRemovedImageIds] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [specifications, setSpecifications] = useState([emptySpec]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    fetchProductById(id).then((res) => {
      const product = res.data;
      reset({
        name: product.name,
        category: product.category?._id,
        price: product.price,
        description: product.description,
        benefits: product.benefits?.join(', '),
        dosageInformation: product.dosageInformation,
        warnings: product.warnings,
        stockQuantity: product.stockQuantity,
        isAvailable: product.isAvailable,
        isFeatured: product.isFeatured,
        isBestSeller: product.isBestSeller,
      });
      setExistingImages(product.images || []);
      setSpecifications(product.specifications?.length ? product.specifications : [emptySpec]);
      setLoading(false);
    });
  }, [id, isEdit, reset]);

  const handleAddFiles = (files) => setNewFiles((prev) => [...prev, ...files]);
  const handleRemoveNewFile = (idx) => setNewFiles((prev) => prev.filter((_, i) => i !== idx));
  const handleRemoveExisting = (publicId) => {
    setExistingImages((prev) => prev.filter((img) => img.publicId !== publicId));
    setRemovedImageIds((prev) => [...prev, publicId]);
  };

  const updateSpec = (idx, field, value) => {
    setSpecifications((prev) => prev.map((spec, i) => (i === idx ? { ...spec, [field]: value } : spec)));
  };
  const addSpec = () => setSpecifications((prev) => [...prev, emptySpec]);
  const removeSpec = (idx) => setSpecifications((prev) => prev.filter((_, i) => i !== idx));

  const onSubmit = async (data) => {
    setError('');
    if (existingImages.length === 0 && newFiles.length === 0) {
      setError('At least one product image is required');
      return;
    }
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, value);
      });
      const cleanSpecs = specifications.filter((s) => s.label && s.value);
      formData.append('specifications', JSON.stringify(cleanSpecs));
      newFiles.forEach((file) => formData.append('images', file));
      if (isEdit && removedImageIds.length > 0) {
        formData.append('removeImagePublicIds', JSON.stringify(removedImageIds));
      }

      if (isEdit) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark">{isEdit ? 'Edit Product' : 'Add Product'}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        <div className="card space-y-5 p-6">
          <h2 className="font-semibold text-brand-dark">Basic Information</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="label-field">Product Name</label>
              <input {...register('name', { required: 'Name is required' })} className="input-field" />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <label className="label-field">Category</label>
              <select {...register('category', { required: 'Category is required' })} className="input-field">
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
            </div>
            <div>
              <label className="label-field">Price (USD)</label>
              <input
                type="number"
                step="0.01"
                {...register('price', { required: 'Price is required', min: 0 })}
                className="input-field"
              />
              {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
            </div>
            <div>
              <label className="label-field">Stock Quantity</label>
              <input
                type="number"
                {...register('stockQuantity', { required: 'Stock quantity is required', min: 0 })}
                className="input-field"
              />
              {errors.stockQuantity && <p className="mt-1 text-xs text-red-500">{errors.stockQuantity.message}</p>}
            </div>
          </div>
          <div>
            <label className="label-field">Description</label>
            <textarea rows={4} {...register('description', { required: 'Description is required' })} className="input-field" />
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
          </div>
          <div>
            <label className="label-field">Benefits (comma-separated)</label>
            <input {...register('benefits')} placeholder="e.g. Supports recovery, Improves focus" className="input-field" />
          </div>
        </div>

        <div className="card space-y-5 p-6">
          <h2 className="font-semibold text-brand-dark">Research Details</h2>
          <div>
            <label className="label-field">Dosage Information</label>
            <textarea rows={3} {...register('dosageInformation')} className="input-field" />
          </div>
          <div>
            <label className="label-field">Warnings</label>
            <textarea rows={2} {...register('warnings')} className="input-field" />
          </div>
          <div>
            <label className="label-field">Specifications</label>
            <div className="space-y-2">
              {specifications.map((spec, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    value={spec.label}
                    onChange={(e) => updateSpec(idx, 'label', e.target.value)}
                    placeholder="Label (e.g. Molecular Weight)"
                    className="input-field"
                  />
                  <input
                    value={spec.value}
                    onChange={(e) => updateSpec(idx, 'value', e.target.value)}
                    placeholder="Value"
                    className="input-field"
                  />
                  <button type="button" onClick={() => removeSpec(idx)} className="px-2 text-red-500">
                    <FaTimes />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addSpec} className="flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
                <FaPlus size={12} /> Add specification
              </button>
            </div>
          </div>
        </div>

        <div className="card space-y-5 p-6">
          <h2 className="font-semibold text-brand-dark">Images</h2>
          <ImageUploadGrid
            existingImages={existingImages}
            onRemoveExisting={handleRemoveExisting}
            newFiles={newFiles}
            onAddFiles={handleAddFiles}
            onRemoveNewFile={handleRemoveNewFile}
          />
        </div>

        <div className="card space-y-4 p-6">
          <h2 className="font-semibold text-brand-dark">Visibility</h2>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">
              <input type="checkbox" defaultChecked {...register('isAvailable')} className="h-4 w-4 rounded border-gray-300 text-brand-blue" />
              Available for sale
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">
              <input type="checkbox" {...register('isFeatured')} className="h-4 w-4 rounded border-gray-300 text-brand-blue" />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">
              <input type="checkbox" {...register('isBestSeller')} className="h-4 w-4 rounded border-gray-300 text-brand-blue" />
              Best Seller
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
