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

// Custom Middleware

function validatePostId(req, res, next) {
  Posts.getById(req.params.id)
  .then(post => {
    if (!post) {
      res.status(400).json({ message: "Invalid post ID" });
    } else {
      res.status(200).json(post);
    };
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: "The post information could not be retrieved" })
  });

  next();
}

module.exports = router;
