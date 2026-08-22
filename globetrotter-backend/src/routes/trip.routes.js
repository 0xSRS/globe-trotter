require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/trips', require('./routes/calendar.routes'));   // ← MOVED HERE, before trip.routes
app.use('/api/trips', require('./routes/trip.routes'));
app.use('/api/trips', require('./routes/itinerary.routes'));
app.use('/api/cities', require('./routes/search.routes').cityRouter);
app.use('/api/activities', require('./routes/search.routes').activityRouter);
app.use('/api/trips', require('./routes/budget.routes'));
// === END OF MEMBER A ROUTES — Member B appends new app.use() lines below ===
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/trips', require('./routes/itineraryView.routes'));
app.use('/api/community', require('./routes/community.routes'));
app.use('/api/trips', require('./routes/sharing.routes'));
app.use('/api/public', require('./routes/sharing.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', statusCode: 404 });
});

app.use(require('./middleware/errorHandler.middleware'));

module.exports = app;