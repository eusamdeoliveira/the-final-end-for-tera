const express = require('express');
const cors = require('cors');

const app = express();

// ==> Rotas da API:
const usersRoute = require('./routes/users.routes');
const coursesRoute = require('./routes/courses.routes');
const subscriptionsRoute = require('./routes/subscriptions.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use('/api/', usersRoute);
app.use('/api/', coursesRoute);
app.use('/api/', subscriptionsRoute);

module.exports = app;