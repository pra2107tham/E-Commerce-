import express from 'express';
import dotenv from "dotenv"
import connectDB from '../server/db/dbConnection.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config({
    path: './.env'
});

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

// Connect to database
connectDB();

// Routes
import userRoutes from "../server/routes/user.routes.js";
import categoryRoutes from "../server/routes/category.routes.js";
import productRoutes from  "../server/routes/product.routes.js";
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);






