import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// ตรวจสอบ Environment Variables
const requiredEnvVars = ['MONGODB_URI', 'NODE_ENV'];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars);
  console.error('📋 Please copy .env.example to .env and fill in the values');
  process.exit(1);
}

const config = {
  port: process.env.PORT || 5000,
  mongodb_uri: process.env.MONGODB_URI,
  node_env: process.env.NODE_ENV || 'development',
  is_production: process.env.NODE_ENV === 'production',
};

// ตรวจสอบ MongoDB URI format
if (!config.mongodb_uri.startsWith('mongodb')) {
  console.error('❌ Invalid MONGODB_URI format');
  console.error('📋 URI should start with mongodb:// or mongodb+srv://');
  process.exit(1);
}

// ตรวจสอบและ Connect MongoDB
export async function connectDB() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(config.mongodb_uri, {
      retryWrites: true,
      w: 'majority',
    });
    console.log('✅ MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    if (config.is_production) {
      process.exit(1);
    }
    return false;
  }
}

export default config;
