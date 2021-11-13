import models from "../models/index.js"
const { Thought, User } = models

const thoughtController = {
  getAllThought(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createThought
  createThought({ body }, res) {
    Thought.create(body)
      .then((dbThoughtData) => {
        User.findOne({ _id: body.userId })
          .then((dbUserData) => {
            dbUserData.thoughts.push(dbThoughtData._id)
            dbUserData.save();

            res.json(dbThoughtData)})
          .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });



      })
      .catch((err) => res.json(err));
  },

  createReaction({ params, body }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then((dbThoughtData) => {
        dbThoughtData.reactions.push(body)

        const reaction = dbThoughtData.reactions[dbThoughtData.reactions.length-1]

        dbThoughtData.save()

          res.json(reaction);
      })
      .catch((err) => res.json(err));
  },

  // update Thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },

  deleteReaction({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then((dbThoughtData) => {
          dbThoughtData.reactions.id(params.reactionId).remove();

          dbThoughtData.save();

          res.json(dbThoughtData);
      })

      .catch((err) => res.json(err));
  },
};

export default thoughtController;
