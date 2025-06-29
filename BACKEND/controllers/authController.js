const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const Otp = require('../models/Otp');
const transporter = require('../config/nodemailer');
const crypto = require('crypto');

exports.registerUser = async (req, res) => {
  console.log('RegisterUser request body:', req.body);
  const { name, email, password, otp } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // OTP is required for signup
    if (!otp) {
      console.log('No OTP provided');
      return res.status(400).json({ message: 'OTP is required for signup' });
    }

    console.log(`Verifying OTP: ${otp} for email: ${email}`);

    // Verify OTP
    const otpRecord = await Otp.findOne({ email, otp });
    console.log('OTP Record found:', otpRecord ? 'Yes' : 'No');

    if (!otpRecord) {
      console.log('Invalid OTP - no record found');
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (otpRecord.expiresAt < new Date()) {
      console.log('OTP expired');
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: 'OTP expired' });
    }

    console.log('OTP verification successful');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with simplified data
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      bio: '',
    });

    if (user) {
      // Clean up OTP after successful verification
      await Otp.deleteOne({ _id: otpRecord._id });
      console.log('User created successfully:', user.email);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
        bio: user.bio,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      console.log('Invalid user data:', req.body);
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Request OTP
exports.requestOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Remove any previous OTPs for this email
    await Otp.deleteMany({ email });
    // Save new OTP
    await Otp.create({ email, otp, expiresAt });

    // For testing: always return OTP in response
    console.log(`OTP for ${email}: ${otp}`);

    // Try to send email if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Your AgriGuide Login OTP',
          text: `Your OTP for AgriGuide login is: ${otp}. It is valid for 5 minutes.`,
        });
        res.json({ message: 'OTP sent to email', otp: otp });
      } catch (err) {
        console.error('Email sending failed:', err);
        res.json({ message: 'OTP generated (email failed)', otp: otp });
      }
    } else {
      res.json({ message: 'OTP sent to email', otp: otp });
    }
  } catch (error) {
    console.error('Error in requestOtp:', error);
    res.status(500).json({ message: 'Failed to generate OTP', error: error.message });
  }
};

// Verify OTP and login
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

  try {
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) return res.status(400).json({ message: 'Invalid OTP' });
    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: 'OTP expired' });
    }

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name: email.split('@')[0], password: crypto.randomBytes(16).toString('hex') });
    }

    // Clean up OTP
    await Otp.deleteOne({ _id: otpRecord._id });

    // Return token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Error in verifyOtp:', error);
    res.status(500).json({ message: 'Failed to verify OTP', error: error.message });
  }
};
