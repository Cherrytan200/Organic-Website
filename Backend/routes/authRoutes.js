import { admin_login } from '../Controllers/authController.js';
import express from 'express';

const router=express.Router();

router.post('/admin-login',admin_login);

export default router;