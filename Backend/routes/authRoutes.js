import { admin_login,getUser, seller_login, seller_register } from '../Controllers/authController.js';
import express from 'express';
import { authMiddleware } from './../middlewares/authMiddleware.js';

const router=express.Router();

router.post('/admin-login',admin_login);
router.get('/get-user',authMiddleware,getUser);
router.post('/seller-register',seller_register);
router.post('/seller-login',seller_login);

export default router;