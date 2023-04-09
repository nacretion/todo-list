import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();

const userController = new UserController();


router.post('/register', userController.createUser);
router.post('/login', userController.authUser);
router.post('/verify', userController.verifyToken);
router.get('/name', userController.getAbbreviatedNameById);
router.get('/all', userController.getAll);

export default router;