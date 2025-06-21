const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/user');
const cropMarketRoutes = require('./routes/cropMarketRoutes');
const cropRoutes = require('./routes/cropRoutes');
const productRoutes = require('./routes/productRoutes');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', userRoutes);
app.use('/api/crop-market', cropMarketRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
