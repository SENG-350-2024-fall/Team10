const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

async function connect() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.DB_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        return connection;  // Return connection if successful
    } catch (error) {
        console.error("Error connecting to MySQL:", error);
        throw error;
    }
}


async function fetchAllPatients() {
  try {
    const connection = await connect();
    const query = 'SELECT * FROM matching_games';
    const [games] = await connection.execute(query);
    await connection.end();
    return games;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
}


async function fetchPatientsById(id) {
  try {
    const connection = await connect();
    const [results] = await connection.execute('SELECT * FROM matching_games WHERE matching_games_id = ?', [id]);
    await connection.end();

    if (results.length > 0) {
      const game = results[0];
      if (typeof game.pairs === 'string') {
        game.pairs = JSON.parse(game.pairs); // Ensure pairs is parsed to an array
      }
      return game;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching game:', error);
    throw error;
  }
}

async function updatePatient(id, title, pairs, coverImagePath) {
  try {
    const connection = await connect();
    const query = 'UPDATE matching_games SET title = ?, pairs = ?, coverImage = ? WHERE matching_games_id = ?';
    await connection.execute(query, [title, JSON.stringify(pairs), coverImagePath, id]);
    await connection.end();
  } catch (error) {
    console.error('Error updating game:', error);
    throw error;
  }
}

async function deletePatient(id) {
  console.log("id of soon to be deleted matching game \t",id);
  try {
    const connection = await connect();
    const [results] = await connection.execute('SELECT coverImage, pairs FROM matching_games WHERE matching_games_id = ?', [id]);

    if (results.length > 0) {
      const { coverImage, pairs } = results[0];
      console.log('Retrieved pairs:', pairs);  // Log the retrieved pairs

      let parsedPairs = pairs;
      if (typeof pairs === 'string') {
        try {
          parsedPairs = JSON.parse(pairs);  // Parse pairs from JSON string
        } catch (parseError) {
          console.error('Error parsing pairs:', parseError);
          throw new Error('Invalid JSON format for pairs');
        }
      }

      // Delete cover image file
      if (coverImage) {
        try {
          fs.unlinkSync(coverImage);
        } catch (unlinkError) {
          console.error('Error deleting cover image:', unlinkError);
        }
      }

      // Delete pair images and audios
      parsedPairs.forEach(pair => {
        if (pair.type === 'image' && pair.image_path) {
          try {
            fs.unlinkSync(pair.image_path);
          } catch (unlinkError) {
            console.error('Error deleting pair image:', unlinkError);
          }
        }
        if (pair.audio_path) {
          try {
            fs.unlinkSync(pair.audio_path);
          } catch (unlinkError) {
            console.error('Error deleting pair audio:', unlinkError);
          }
        }
      });

      const query = 'DELETE FROM matching_games WHERE matching_games_id = ?';
      await connection.execute(query, [id]);
    }

    await connection.end();
  } catch (error) {
    console.error('Error deleting game:', error);
    throw error;
  }
}



module.exports = {
  fetchAllPatients,
  fetchPatientsById,
  updatePatient,
  deletePatient
};
