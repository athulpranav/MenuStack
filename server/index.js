import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import menuRoutes from './routes/menuRoutes.js';
// import itemRoutes from './routes/itemRoutes.js'; // If separate item routes needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/menus', menuRoutes);
// app.use('/api/items', itemRoutes); // Uncomment if you split item logic

// Root Endpoint
app.get('/', (req, res) => {
  res.send('MenuBoard API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
