import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup multer untuk upload foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4()}.${file.mimetype.split('/')[1]}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB per file
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files allowed'), false);
    }
  }
});

// Database simulation (file-based)
const messagesDir = path.join(__dirname, 'messages');
const uploadsDir = path.join(__dirname, 'uploads');
const CLEANUP_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours
const FILE_EXPIRY_DAYS = 30;

function ensureMessagesDir() {
  if (!fs.existsSync(messagesDir)) {
    fs.mkdirSync(messagesDir, { recursive: true });
  }
}

// Function untuk cleanup old files (photos dan messages older than 30 days)
function cleanupOldFiles() {
  const now = Date.now();
  const expiryTime = FILE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

  // Cleanup photos
  try {
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      files.forEach(file => {
        const filePath = path.join(uploadsDir, file);
        const stat = fs.statSync(filePath);
        const fileAge = now - stat.mtimeMs;

        if (fileAge > expiryTime) {
          fs.unlinkSync(filePath);
          console.log(`🗑️  Deleted old photo: ${file} (${Math.floor(fileAge / (24 * 60 * 60 * 1000))} days old)`);
        }
      });
    }
  } catch (error) {
    console.error('Error cleaning up photos:', error);
  }

  // Cleanup messages
  try {
    if (fs.existsSync(messagesDir)) {
      const files = fs.readdirSync(messagesDir);
      files.forEach(file => {
        const filePath = path.join(messagesDir, file);
        const stat = fs.statSync(filePath);
        const fileAge = now - stat.mtimeMs;

        if (fileAge > expiryTime) {
          fs.unlinkSync(filePath);
          console.log(`🗑️  Deleted old message: ${file} (${Math.floor(fileAge / (24 * 60 * 60 * 1000))} days old)`);
        }
      });
    }
  } catch (error) {
    console.error('Error cleaning up messages:', error);
  }
}

// API Routes

// 1. Upload Photos
app.post('/api/upload', upload.array('photos', 50), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No photos uploaded' });
    }

    const photoUrls = req.files.map(file => `/uploads/${file.filename}`);

    console.log('Files uploaded successfully:', photoUrls);

    res.json({
      success: true,
      photos: photoUrls,
      count: photoUrls.length
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
});

// 2. Create Message
app.post('/api/messages', express.json({ limit: '50mb' }), (req, res) => {
  try {
    ensureMessagesDir();

    const { from, to, meet, first, moment, photos } = req.body;

    // Validasi
    if (!from || !to || !meet || !first || !moment) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate unique ID
    const messageId = uuidv4();

    // Create message object
    const message = {
      id: messageId,
      from,
      to,
      meet,
      first,
      moment,
      photos: photos || [],
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 hari
    };

    // Save to file
    const messagePath = path.join(messagesDir, `${messageId}.json`);
    fs.writeFileSync(messagePath, JSON.stringify(message, null, 2));

    res.json({
      success: true,
      messageId,
      link: `${process.env.BASE_URL || 'http://localhost:3000'}/message/${messageId}`
    });
  } catch (error) {
    console.error('Create message error:', error);
    res.status(500).json({ error: 'Failed to create message', details: error.message });
  }
});

// 3. Get Message by ID
app.get('/api/messages/:messageId', (req, res) => {
  try {
    ensureMessagesDir();

    const { messageId } = req.params;
    const messagePath = path.join(messagesDir, `${messageId}.json`);

    if (!fs.existsSync(messagePath)) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const message = JSON.parse(fs.readFileSync(messagePath, 'utf-8'));

    // Check if expired
    if (new Date(message.expiresAt) < new Date()) {
      return res.status(410).json({ error: 'Message has expired' });
    }

    res.json(message);
  } catch (error) {
    console.error('Get message error:', error);
    res.status(500).json({ error: 'Failed to get message', details: error.message });
  }
});

// 4. Serve static message page
app.get('/message/:messageId', (req, res) => {
  const { messageId } = req.params;
  res.sendFile(path.join(__dirname, '../result.html'));
});

// 5. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Error handling middleware - HARUS after semua routes
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  
  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File terlalu besar', details: 'Max 10MB per file' });
  }
  if (err.code === 'LIMIT_FILE_COUNT') {
    return res.status(413).json({ error: 'Terlalu banyak file', details: 'Max 50 files' });
  }
  if (err.message === 'Only image files allowed') {
    return res.status(400).json({ error: 'Format tidak didukung', details: 'Hanya image files (JPG, PNG, etc)' });
  }
  if (err.code === 'LIMIT_PART_COUNT') {
    return res.status(413).json({ error: 'Terlalu banyak fields' });
  }

  // Generic error
  res.status(500).json({ 
    error: 'Server error', 
    message: err.message,
    code: err.code 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 Romantic Message Server Started');
  console.log('='.repeat(50));
  console.log(`📌 Server URL: http://localhost:${PORT}`);
  console.log(`📁 Upload folder: ${path.join(__dirname, 'uploads')}`);
  console.log(`📁 Messages folder: ${path.join(__dirname, 'messages')}`);
  console.log('\n📍 Available endpoints:');
  console.log('   POST   /api/upload - Upload photos');
  console.log('   POST   /api/messages - Create message');
  console.log('   GET    /api/messages/:id - Get message');
  console.log('   GET    /message/:id - View message page');
  console.log('   GET    /api/health - Health check');
  console.log('\n💡 Frontend accessible at: http://localhost:' + PORT);
  console.log(`⏱️  Auto-cleanup enabled: Files older than ${FILE_EXPIRY_DAYS} days will be deleted`);
  console.log('='.repeat(50) + '\n');

  // Run initial cleanup on startup
  cleanupOldFiles();

  // Setup periodic cleanup (every 24 hours)
  setInterval(cleanupOldFiles, CLEANUP_INTERVAL);
});
