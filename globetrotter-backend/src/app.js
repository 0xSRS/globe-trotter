require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/trips', require('./routes/trip.routes'));
// === END OF MEMBER A ROUTES — Member B appends new app.use() lines below ===

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', statusCode: 404 });
});

app.use(require('./middleware/errorHandler.middleware'));

module.exports = app;