// Import required packages
const express = require('express');  // Import Express.js framework
const mysql = require('mysql2');     // Import MySQL database driver
const cors = require('cors');        // Import CORS middleware for cross-origin requests
require('dotenv').config();          // Load environment variables from .env file

// Initialize Express application
const app = express();

// Set up middleware
app.use(cors());                     // Enable CORS for all routes
app.use(express.json());             // Parse incoming JSON requests

// Configure MySQL database connection using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,         // Database host from .env
  user: process.env.DB_USER,         // Database username from .env
  password: process.env.DB_PASSWORD, // Database password from .env
  database: process.env.DB_NAME      // Database name from .env
});

// First connection attempt to database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);  // Log any connection errors
    return;
  }
  console.log('Connected to database successfully!');     // Log successful connection
});

// Define POST endpoint for multiplication operations
app.post('/api/multiply', (req, res) => {
  const { number1, number2, result } = req.body;  // Extract values from request body

  // SQL query to insert calculation results into database
  const query = 'INSERT INTO calculations (number1, number2, result) VALUES (?, ?, ?)';
  connection.query(query, [number1, number2, result], (err, results) => {
    if (err) {
      console.error('Error saving to database:', err);  // Log database errors
      res.status(500).json({ error: 'Error saving to database' });  // Send error response
      return;
    }
    
    // Send success response with the inserted row ID
    res.json({ message: 'Calculation saved successfully', id: results.insertId });
  });
});

// Set up server port
const PORT = 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);  // Log server start
});

