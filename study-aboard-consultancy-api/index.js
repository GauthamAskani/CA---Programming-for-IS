const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Import routes
const studentRoutes = require('./routes/student');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', studentRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Study Abroad Consultancy');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
