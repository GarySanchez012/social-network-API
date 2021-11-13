import {Router} from "express"
const router = Router();
import thoughtController from '../../controllers/thought-controller.js';

const {
  getAllThought,
  getThoughtById,
  createThought,
  createReaction,
  updateThought,
  deleteThought,
  deleteReaction
} = thoughtController


router
  .route('/')
  .get(getAllThought)
  .post(createThought);


  // /api/users/:userId/friends/:friendId
router
  .route("/:thoughtId/reactions")
  .post(createReaction);

router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction);
  

router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

export default router;
