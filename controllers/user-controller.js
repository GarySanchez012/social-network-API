import { User } from "../models/index.js";

const userController = {
  getAllUser(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // POST to add a new friend to a user's friend list
  createFriend({ params }, res) {
    User.findOne({ _id: params.userId })
      .then((dbUserData) => {
        User.findOne({ _id: params.friendId }).then((otherUserData) => {
          dbUserData.friends.push(otherUserData._id);
          dbUserData.save();

          res.json(dbUserData);
        });
      })

      .catch((err) => res.json(err));
  },

  // update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(() => res.end())
      .catch((err) => res.json(err));
  },

  deleteFriend({ params }, res) {
    User.findOne({ _id: params.userId })
      .then((dbUserData) => {
        User.findOne({ _id: params.friendId }).then((otherUserData) => {
          const friendIndex = dbUserData.friends.indexOf(otherUserData._id);

          if (friendIndex !== -1) {
            //splice removes '1' item at index of friendIndex
            dbUserData.friends.splice(friendIndex, 1);
          }

          dbUserData.save();

          res.json(dbUserData);
        });
      })

      .catch((err) => res.json(err));
  },
};

export default userController;