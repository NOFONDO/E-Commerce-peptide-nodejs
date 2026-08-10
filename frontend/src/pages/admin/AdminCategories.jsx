import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { createCategory, deleteCategory, fetchCategories, updateCategory } from '../../api/categories';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const load = () => {
    setLoading(true);
    fetchCategories()
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    reset({ name: '', description: '' });
    setEditingId(null);
    setError('');
    setShowForm(true);
  };

  const openEdit = (category) => {
    reset({ name: category.name, description: category.description });
    setEditingId(category._id);
    setError('');
    setShowForm(true);
  };

  const onSubmit = async (data) => {
    setError('');
    try {
      if (editingId) {
        await updateCategory(editingId, data);
      } else {
        await createCategory(data);
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save category');
    }
  };

  const handleDelete = async (category) => {
    if (!window.confirm(`Delete category "${category.name}"?`)) return;
    try {
      await deleteCategory(category._id);
      load();
    } catch (err) {
      window.alert(err.response?.data?.message || 'Failed to delete category');
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Categories</h1>
          <p className="mt-1 text-sm text-brand-gray">Organize your products by category.</p>
        </div>
        <button type="button" onClick={openCreate} className="btn-primary">
          <FaPlus size={14} /> Add Category
        </button>
      </div>

      {showForm && (
        <div className="card mt-6 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-brand-dark">{editingId ? 'Edit Category' : 'New Category'}</h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-brand-gray">
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
            <div>
              <label className="label-field">Name</label>
              <input {...register('name', { required: 'Name is required' })} className="input-field" />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <label className="label-field">Description</label>
              <textarea rows={3} {...register('description')} className="input-field" />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Saving...' : 'Save Category'}
            </button>
          </form>
        </div>
      )}

      <div className="mt-8">
        {loading ? (
          <Loader />
        ) : categories.length === 0 ? (
          <EmptyState title="No categories yet" description="Create your first category to organize products." />
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-brand-gray">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3">Products</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td className="px-5 py-3 font-medium text-brand-dark">{category.name}</td>
                    <td className="max-w-xs truncate px-5 py-3 text-brand-gray">{category.description || '—'}</td>
                    <td className="px-5 py-3 text-brand-gray">{category.productCount}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => openEdit(category)} className="text-brand-blue hover:text-brand-blueDark">
                          <FaEdit />
                        </button>
                        <button type="button" onClick={() => handleDelete(category)} className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
