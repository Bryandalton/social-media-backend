const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// /api/thoughts/:thoughtId/Reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/Reactions/:ReactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;