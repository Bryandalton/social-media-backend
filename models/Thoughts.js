const mongoose = require('mongoose');
const reactionSchema = require('./Reaction')
const thoughtsSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    username: {
        type: String, 
        required: true},
    reactions: [reactionSchema],
})

const Thoughts = model("thoughts", thoughtsSchema)

module.exports = Thoughts;
