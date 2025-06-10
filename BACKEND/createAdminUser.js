const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config(); // Ensure environment variables are loaded

const createAdminUser = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@agriguide.com';
    const adminPassword = 'admin123';

    const userExists = await User.findOne({ email: adminEmail });
    if (userExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const adminUser = new User({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdminUser();
