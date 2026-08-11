const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Settings = require('./models/Settings');
const logger = require('./utils/logger');

const seed = async () => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      logger.error(
        'Seeding skipped: ADMIN_EMAIL and ADMIN_PASSWORD environment variables must be set'
      );
      return;
    }

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await Admin.create({
        name: process.env.ADMIN_NAME || 'Store Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'superadmin',
      });
      logger.info(`Admin account created for ${adminEmail}`);
    } else {
      logger.info(`Admin account already exists for ${adminEmail}, skipping creation`);
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
  } catch (error) {
    logger.error(`Seeding failed: ${error.message}`);
  }
};

// Allow running this file directly via `npm run seed`, in which case we
// connect to MongoDB ourselves and exit once done. When imported by the
// server, only the `seed` function is used and the process is left running.
if (require.main === module) {
  (async () => {
    await connectDB();
    await seed();
    process.exit(0);
  })();
}

module.exports = seed;
