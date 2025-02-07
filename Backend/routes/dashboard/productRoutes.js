import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { add_product } from '../../Controllers/dashboard/productController.js';
const router=express.Router();

router.post('/product-add',authMiddleware,add_product);



export default router;