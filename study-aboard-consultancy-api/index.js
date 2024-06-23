const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
require('dotenv').config();

const routeHandler = require('./routes/index')
const uploadDocument = require('./routes/document')


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Welcome to Study Abroad Consultancy');
});

app.use('/api', routeHandler)

app.use('/api', uploadDocument)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
