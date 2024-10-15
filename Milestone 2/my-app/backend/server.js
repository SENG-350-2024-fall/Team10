const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();

dotenv.config();

// Ensures necessary directories exist
const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDirectoryExistence(path.join(__dirname, '../uploads'));
ensureDirectoryExistence(path.join(__dirname, '../audio_uploads'));
ensureDirectoryExistence(path.join(__dirname, '../model_uploads'));

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'coverImage' || file.fieldname === 'pairImages') {
      cb(null, 'uploads/');
    } else if (file.fieldname === 'pairAudios') {
      cb(null, 'audio_uploads/');
    } else if (file.fieldname === 'imageFile') { // Case for POIs
      cb(null, 'uploads/');
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 200 * 1024 * 1024 } // 200MB limit
});

// Importing routes
const patientData = require("./patientData.js");


// Passport configuration
const initializePassport = require('./authentication/passConfig.js');
initializePassport(passport);

const PORT = process.env.PORT || 3030;
const sessionSecret = process.env.SESSION_SECRET;
const cookieSecurity = process.env.SESSION_COOKIE_SECURE === "true";

// Middleware
app.use(cors({
  origin: '*', // Allow all origins, modify if necessary
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(require('cookie-parser')());
app.use(session({
  secret: sessionSecret, 
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: cookieSecurity,
    maxAge: 3600000 *24// 24 hour session duration
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

// Handling data inputs
app.use(bodyParser.json({ limit: '2000mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '2000mb' }));
app.use(express.raw({ type: 'audio/wav', limit: '100mb' }));

// Serving static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, '../../data')));
app.use(express.static(path.join(__dirname, 'build')));

// Serve locations.json file
app.get('/data/locations.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'locations.json'));
});

// Use routers
app.use('/patientdata', patientData); // Router for patient data


// Handle all other routes (React routing)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});