const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'consultancy'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

app.get('/', (req, res) => {
    res.send('Welcome to Study Aboard Consultancy');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

