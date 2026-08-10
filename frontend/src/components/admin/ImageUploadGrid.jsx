import React from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';

const ImageUploadGrid = ({ existingImages, onRemoveExisting, newFiles, onAddFiles, onRemoveNewFile }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    onAddFiles(files);
    e.target.value = '';
  };

  return (
    <div>
      <label className="label-field">Product Images</label>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {existingImages.map((img) => (
          <div key={img.publicId} className="relative aspect-square overflow-hidden rounded-xl border border-gray-200">
            <img src={img.url} alt="Product" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onRemoveExisting(img.publicId)}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
            >
              <FaTimes size={10} />
            </button>
          </div>
        ))}
        {newFiles.map((file, idx) => (
          <div key={`${file.name}-${idx}`} className="relative aspect-square overflow-hidden rounded-xl border border-brand-blue">
            <img src={URL.createObjectURL(file)} alt="New upload" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onRemoveNewFile(idx)}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
            >
              <FaTimes size={10} />
            </button>
          </div>
        ))}
        <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-300 text-brand-gray hover:border-brand-blue hover:text-brand-blue">
          <FaPlus size={16} />
          <span className="text-xs">Add</span>
          <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleFileChange} className="hidden" />
        </label>
      </div>
      <p className="mt-2 text-xs text-brand-gray">JPEG, PNG, or WEBP. Max 5MB per image, up to 8 images total.</p>
    </div>
  );
};

export default ImageUploadGrid;
