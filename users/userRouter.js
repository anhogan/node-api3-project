const express = require('express');

const Users = require('./userDb');

const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, uniqueUsername, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      if (user) {
      Users.get()
        .then(users => {
          res.status(201).json(users);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ message: "The user information could not be retrieved" });
        });
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The user could not be created" });
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const userId = { ...req.body, user_id: req.params.id };

  Posts.insert(userId)
    .then(post => {
      if (post) {
        Users.getUserPosts(req.params.id)
          .then(posts => {
            res.status(201).json(posts);
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post information could not be retrieved" });
          });
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The post information could not be retrieved" });
    });
});

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The user information could not be retrieved" });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The user information could not be retrieved" });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The post information could not be retrieved" });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        Users.get()
          .then(users => {
            res.status(200).json(users);
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The user information could not be retrieved" });
          });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The user could not be removed" });
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then(count => {
      if (count === 1) {
        Users.get()
          .then(users => {
            res.status(200).json(users);
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The user information could not be retrieved" });
          });
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The user could not be updated" });
    });
});

// Custom Middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(400).json({ message: "Invalid user ID" });
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The user information could not be retreived" })
    });

  next();
};

function validateUser(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "Missing required name field" });
  };

  next();
};

function validatePost(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "Missing required text field" });
  };

  next();
};

function uniqueUsername(req, res, next) {
  Users.get()
    .then(users => {
      console.log(users);
      const taken = users.filter((user) => {
        return user.name === req.body.name
      });
      console.log(taken);
      if (taken.length > 0) {
        res.status(400).json({ message: "That name is already in use, please choose another one" });
      } 
    })
    .catch(error => {
      console.log(error);
    });

  next();
}

module.exports = router;
