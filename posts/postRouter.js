const express = require('express');

const Posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The post information could not be retrieved" });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  Posts.getById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The post information could not be retrieved" });
    });
});

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        Posts.get()
          .then(posts => {
            res.status(200).json(posts);
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post information could not be retrieved" });
          });
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The post could not be deleted" });
    });
});

router.put('/:id', validatePostId, (req, res) => {
  Posts.update(req.params.id, req.body)
    .then(count => {
      if (count === 1) {
        Posts.get()
          .then(posts => {
            res.status(200).json(posts);
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post information could not be retrieved" });
          });
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The post could not be updated" });
    });
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
