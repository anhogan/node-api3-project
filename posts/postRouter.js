const express = require('express');

const Posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  Posts.getById(req.params.id)
  .then(post => {
    if (!post) {
      res.status(400).json({ message: "Invalid post ID" });
    } else {
      res.status(200).json(post);
    };
  });

  next();
}

module.exports = router;
