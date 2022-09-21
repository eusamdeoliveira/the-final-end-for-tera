const express = require('express');
const cors = require('cors');
const path = require('path')

const app = express();

// ==> Rotas da API:
const usersRoute = require('./routes/users.routes');
const coursesRoute = require('./routes/courses.routes');
const subscriptionsRoute = require('./routes/subscriptions.routes');
const questionsRoute = require('./routes/questions.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(require('sanitize').middleware);
app.use(express.static(path.join(__dirname, "../client/build")));

app.use('/api/', usersRoute);
app.use('/api/', coursesRoute);
app.use('/api/', subscriptionsRoute);
app.use('/api/', questionsRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = app;