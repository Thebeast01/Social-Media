import express from 'express';
import { getUsers, getUsersFriends, addRemoveFriend } from '../controllers/users.js';
import verifyToken from '../middleware/auth.js';
const router = express.Router();
// Read 
router.get('/:id', verifyToken, getUsers);
router.get('/:id/friends', verifyToken, getUsersFriends);

// Update

router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

