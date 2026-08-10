const cloudinary = require('../config/cloudinary');

const uploadBufferToCloudinary = (buffer, folder = 'peptide-store/products') =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });

const uploadMultipleBuffers = (files, folder) =>
  Promise.all(files.map((file) => uploadBufferToCloudinary(file.buffer, folder)));

module.exports = { uploadBufferToCloudinary, uploadMultipleBuffers };
