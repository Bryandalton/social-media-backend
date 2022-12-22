const {User, Thoughts} = require('../models');

module.exports = {
    getUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    //delete a user
    deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thoughts.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({
              message: 'user deleted, but no thoughts found',
            })
          : res.json({ message: 'user successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },
    updateUser(req, res) {
        console.log(req.body);
        User.findOneAndUpdate(
            {_id: req.params.userId}, 
            {$set: req.body},
            { runValidators: true, new: true }
    )
    .then((user) => {
        !user
        ? res.status(404).json({message: 'No user with this id.'})
        : res.json(user)
    }).catch((err) => res.status(500).json(err));
    },
  };