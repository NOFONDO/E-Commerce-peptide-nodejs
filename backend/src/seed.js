const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Settings = require('./models/Settings');
const logger = require('./utils/logger');

const seed = async () => {
  await connectDB();

  const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL.toLowerCase() });
  if (!existingAdmin) {
    await Admin.create({
      name: process.env.ADMIN_NAME || 'Store Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'superadmin',
    });
    logger.info(`Admin account created for ${process.env.ADMIN_EMAIL}`);
  } else {
    logger.info('Admin account already exists, skipping creation');
  }

  const existingSettings = await Settings.findOne({ key: 'store_settings' });
  if (!existingSettings) {
    await Settings.create({
      key: 'store_settings',
      whatsappNumber: '+447346257943',
      contactEmail: 'zepeptidebiotechnology@gmail.com',
      storeDescription: 'Premium research peptides for laboratory use.',
    });
    logger.info('Default store settings created');
  } else {
    logger.info('Store settings already exist, skipping creation');
  }

  logger.info('Seeding complete');
  process.exit(0);
};

seed().catch((err) => {
  logger.error(`Seeding failed: ${err.message}`);
  process.exit(1);
});
