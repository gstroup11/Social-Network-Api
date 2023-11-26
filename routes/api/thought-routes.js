const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:id
router.route('/:id').get(getThoughtById).post(updateThought).delete(deleteThought);

// /api/thoughts/:id/reactions
router.route('/:id/reactions').post(addReaction);

// /api/thoughts/:id/reactions/:reactionId
router.route('/:id/reactions/:reactionId').delete(removeReaction);

module.exports = router;

