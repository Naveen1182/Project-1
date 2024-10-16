const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Set up the MySQL connection
const db = mysql.createConnection({
    host: 'localhost',          // Change if your database is hosted elsewhere
    user: 'your_username',      // Your MySQL username
    password: 'your_password',  // Your MySQL password
    database: 'your_database',  // Your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Define the endpoint to check if the vehicle number exists
app.get('/check-vehicle', (req, res) => {
    const vehicleNumber = req.query.number; // Get vehicle number from query parameters
    const query = 'SELECT * FROM vehicles WHERE vehicle_number = ?'; // SQL query to check the vehicle number

    db.query(query, [vehicleNumber], (error, results) => {
        if (error) {
            return res.status(500).send(error); // Send error if the query fails
        }
        if (results.length > 0) {
            res.json({ exists: true }); // Vehicle number exists
        } else {
            res.json({ exists: false }); // Vehicle number does not exist
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000'); // Confirmation message
});
