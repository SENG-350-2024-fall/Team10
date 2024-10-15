const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { fetchAllPatients, fetchPatientsById, updatePatient, deletePatient } = require('./database.js');
const router = express.Router();

const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDirectoryExistence(path.join(__dirname, '../uploads'));
ensureDirectoryExistence(path.join(__dirname, '../audio_uploads'));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'coverImage' || file.fieldname === 'pairImages') {
      cb(null, 'uploads/');
    } else if (file.fieldname === 'pairAudios') {
      cb(null, 'audio_uploads/');
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
}).fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pairImages', maxCount: 50 }, { name: 'pairAudios', maxCount: 50 }]);

// Middleware for logging requests
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = await fetchAllPatients();
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// Get a specific game by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid game ID' });
  }

  try {
    const game = await fetchPatientsById(id);
    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ error: 'Failed to fetch game' });
  }
});

// Create a new game
router.post('/', upload, async (req, res) => {
  try {
    console.log('Received body:', req.body);
    console.log('Received files:', req.files);

    const { title, pairs } = req.body;
    const coverImagePath = req.files.coverImage ? req.files.coverImage[0].path : null;

    const parsedPairs = JSON.parse(pairs); // Parse pairs from JSON string

    // Save image and audio paths for pairs
    if (req.files.pairImages || req.files.pairAudios) {
      parsedPairs.forEach((pair, index) => {
        if (pair.type === 'image' && req.files.pairImages && req.files.pairImages[index]) {
          pair.image_path = req.files.pairImages[index].path;
        }
        if (pair.audio && req.files.pairAudios && req.files.pairAudios[index]) {
          pair.audio_path = req.files.pairAudios[index].path;
        }
      });
    }

    await createMatchingGame(title, parsedPairs, coverImagePath);

    res.status(200).json({ message: 'Game created successfully!' });
  } catch (error) {
    console.error('Error saving game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', upload, async (req, res) => {
  try {
    console.log('Received body:', req.body);
    console.log('Received files:', req.files);

    const { id } = req.params;
    const { title, pairs } = req.body;

    const parsedPairs = JSON.parse(pairs); // Parse pairs from JSON string

    const existingGame = await updatePatient(id);

    let coverImagePath = existingGame.coverImage;
    if (req.files.coverImage) {
      coverImagePath = req.files.coverImage[0].path;
    } else if (req.body.coverImageURL) {
      coverImagePath = req.body.coverImageURL;
    }

    // Save image and audio paths for pairs
    parsedPairs.forEach((pair, index) => {
      if (pair.type === 'image') {
        if (req.files.pairImages && req.files.pairImages[index]) {
          pair.image_path = req.files.pairImages[index].path;
        } else if (existingGame.pairs[index]) {
          pair.image_path = existingGame.pairs[index].image_path;
        }
      }
      if (pair.audio) {
        if (req.files.pairAudios && req.files.pairAudios[index]) {
          pair.audio_path = req.files.pairAudios[index].path;
        } else if (existingGame.pairs[index]) {
          pair.audio_path = existingGame.pairs[index].audio_path;
        }
      }
    });

    console.log('Updated game data:', { title, pairs: parsedPairs, coverImagePath });

    await updateMatchingGame(id, title, parsedPairs, coverImagePath);

    res.status(200).json({ message: 'Game updated successfully!' });
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({ error: 'Failed to update game' });
  }
});

// Delete a game by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deletePatient(id);
    res.status(200).json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ error: 'Failed to delete game' });
  }
});

module.exports = router;