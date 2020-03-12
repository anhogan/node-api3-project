const express = require('express');

const userRoutes = require('./users/userRouter');

const postRoutes = require('./posts/postRouter');

const server = express();

server.use(express.json());

server.use(logger);

server.use('/api/users', userRoutes);

server.use('/api/posts', postRoutes);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// Custom Middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.url} at [${new Date().toISOString()}]`);

  next();
}

module.exports = server;
