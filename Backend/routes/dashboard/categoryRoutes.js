
import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { add_category, get_category } from '../../Controllers/dashboard/categoryController.js';

const router=express.Router();

router.post('/category-add',authMiddleware,add_category);
router.get('/category-get',authMiddleware,get_category);


export default router;