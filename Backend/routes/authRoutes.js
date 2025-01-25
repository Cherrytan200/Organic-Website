import { admin_login,getUser } from '../Controllers/authController.js';
import express from 'express';
import { authMiddleware } from './../middlewares/authMiddleware.js';

const router=express.Router();

router.post('/admin-login',admin_login);
router.get('/get-user',authMiddleware,getUser);

export default router;