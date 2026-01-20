const express = require('express');
const cors = require('cors');
const authRoutes = require('./modules/auth/auth.routes');
const memberRoutes = require('./modules/members/member.routes');
const authMiddleware = require('./middlewares/auth.middleware');

const app = express();
app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/members', authMiddleware, memberRoutes);

module.exports = app;
