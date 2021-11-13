import {Router} from "express"
const router = Router();
import userController from '../../controllers/user-controller.js';
const { getAllUser, getUserById, createUser, createFriend, updateUser, deleteUser, deleteFriend } = userController

router
  .route('/')
  .get(getAllUser)
  .post(createUser);


  // /api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(createFriend)
  .delete(deleteFriend);

router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

export default router;
