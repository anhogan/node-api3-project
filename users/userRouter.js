const express = require('express');

const Users = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(400).json({ message: "Invalid user ID" });
      } else {
        res.status(200).json(user);
      };
    });

  next();
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "Missing required name field" });
  };

  next();
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "Missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "Missing required text field" });
  };

  next();
}

module.exports = router;
