const { Schema, model } = require("mongoose");
const moment = require("moment");
const reactionSchema = require("./reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => moment(createdAt).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create a virtual called reactionCount
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create the Thought model using the thoughtSchema
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
