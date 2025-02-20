import express from 'express';
const router=express.Router();
import { customer_login,customer_register,customer_logout } from '../../Controllers/home/customerAuthController.js'

router.post('/customer/customer-register',customer_register)
router.post('/customer/customer-login',customer_login)

router.get('/customer/logout',customer_logout)

export default router;