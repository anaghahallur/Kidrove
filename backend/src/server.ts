import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Enquiry from './models/enquiry';
import { sendRegistrationNotification } from './utils/mailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Local JSON File Database Fallback setup
const DATA_DIR = path.join(__dirname, '../data');
const DATA_FILE = path.join(DATA_DIR, 'enquiries.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Database Connection Status tracking
let isMongoConnected = false;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kidrove';

console.log(`[Database] Attempting to connect to MongoDB at: ${MONGO_URI}`);
mongoose.connect(MONGO_URI)
  .then(() => {
    isMongoConnected = true;
    console.log('[Database] MongoDB connected successfully.');
  })
  .catch((err) => {
    console.warn('[Database] MongoDB connection failed. Falling back to local file storage (data/enquiries.json).');
    console.warn(`[Database] Error detail: ${err.message}`);
  });

// Setup schema/model for fallback usage representation
interface SimpleEnquiry {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  id?: string;
}

// Helper to save enquiry locally
function saveEnquiryLocally(data: { name: string; email: string; phone: string }): SimpleEnquiry {
  const newEnquiry: SimpleEnquiry = {
    ...data,
    createdAt: new Date().toISOString(),
    id: Math.random().toString(36).substring(2, 9)
  };

  let list: SimpleEnquiry[] = [];
  if (fs.existsSync(DATA_FILE)) {
    try {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      list = JSON.parse(content);
    } catch (error) {
      console.error('[Fallback Storage] Error reading or parsing JSON file, resetting storage.', error);
    }
  }

  list.push(newEnquiry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
  console.log('[Fallback Storage] Enquiry saved locally in backend/data/enquiries.json');
  return newEnquiry;
}

// Get count of local enquiries
function getLocalEnquiryCount(): number {
  if (!fs.existsSync(DATA_FILE)) return 0;
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    const list = JSON.parse(content);
    return Array.isArray(list) ? list.length : 0;
  } catch {
    return 0;
  }
}

// Routes
// 1. Status Check Route
app.get('/api/status', async (req: Request, res: Response) => {
  let mongoCount = 0;
  if (isMongoConnected) {
    try {
      mongoCount = await Enquiry.countDocuments();
    } catch (e) {
      console.error('Error counting documents in MongoDB', e);
    }
  }

  res.json({
    status: 'online',
    database: isMongoConnected ? 'MongoDB' : 'Local File Storage (Fallback)',
    mongoConnected: isMongoConnected,
    stats: {
      mongoEnquiries: mongoCount,
      localFileEnquiries: getLocalEnquiryCount()
    }
  });
});

// 2. Submit Enquiry Route
app.post('/api/enquiry', async (req: Request, res: Response): Promise<void> => {
  const { name, email, phone } = req.body;

  // 1. Input Validation
  const errors: { [key: string]: string } = {};

  if (!name || name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!email || email.trim() === '') {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Please provide a valid email address';
    }
  }

  if (!phone || phone.trim() === '') {
    errors.phone = 'Phone number is required';
  } else {
    // Basic phone validation (allowing digits, spaces, hyphens, and + sign, length 7 to 15)
    const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
    if (!phoneRegex.test(phone.trim())) {
      errors.phone = 'Please provide a valid phone number (7 to 15 digits)';
    }
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
    return;
  }

  // 2. Persist Data
  try {
    const trimmedData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim()
    };

    let savedEnquiryData;
    if (isMongoConnected) {
      const newEnquiry = new Enquiry(trimmedData);
      const savedEnquiry = await newEnquiry.save();
      savedEnquiryData = {
        name: savedEnquiry.name,
        email: savedEnquiry.email,
        phone: savedEnquiry.phone,
        createdAt: savedEnquiry.createdAt.toISOString()
      };

      // Trigger email notification asynchronously
      sendRegistrationNotification(savedEnquiryData).catch(err => console.error('[Mailer Error] ', err));

      res.status(201).json({
        success: true,
        message: 'Enquiry submitted successfully and saved to MongoDB!',
        data: savedEnquiry,
        storage: 'MongoDB'
      });
    } else {
      const savedEnquiry = saveEnquiryLocally(trimmedData);
      savedEnquiryData = {
        name: savedEnquiry.name,
        email: savedEnquiry.email,
        phone: savedEnquiry.phone,
        createdAt: savedEnquiry.createdAt
      };

      // Trigger email notification asynchronously
      sendRegistrationNotification(savedEnquiryData).catch(err => console.error('[Mailer Error] ', err));

      res.status(201).json({
        success: true,
        message: 'Enquiry submitted successfully! (Stored in local file database)',
        data: savedEnquiry,
        storage: 'Local File'
      });
    }
  } catch (error: any) {
    console.error('[Server Error] Error handling enquiry submission:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error occurred while processing your request.',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`[Server] Express server running at http://localhost:${PORT}`);
});
