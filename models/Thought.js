import mongoose from "mongoose";
const { Schema, model } = mongoose
import dateFormat from "../utils/dateFormat.js";

const ReactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      max: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
      // user: [
      //   {
      //     type: Schema.Types.ObjectId,
      //     ref: "User",
      //   }
      // ]
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);


// get total count of reactions on retrieval
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length
});

const Thought = model("Thought", ThoughtSchema);

export default Thought;
