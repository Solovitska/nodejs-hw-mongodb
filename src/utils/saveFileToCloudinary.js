import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';
import { CLOUDINARY } from '../constants/index.js';

if (process.env.ENABLE_CLOUDINARY === 'true') {
  cloudinary.config({
    secure: true,
    cloud_name: env(CLOUDINARY.CLOUD_NAME),
    api_key: env(CLOUDINARY.API_KEY),
    api_secret: env(CLOUDINARY.API_SECRET),
  });
}

export const saveFileToCloudinary = async (file) => {
  if (process.env.ENABLE_CLOUDINARY !== 'true') {
    throw new Error('Cloudinary integration is not enabled.');
  }

  try {
    const response = await cloudinary.uploader.upload(file.path);
    return response.secure_url;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw new Error('File upload failed');
  }
};
