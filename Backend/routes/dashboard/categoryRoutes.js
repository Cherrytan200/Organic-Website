import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { add_category, get_category,update_category,deleteCategory } from '../../Controllers/dashboard/categoryController.js';
const router=express.Router();

router.post('/category-add',authMiddleware,add_category);
router.get('/category-get',authMiddleware,get_category);
router.put('/category-update/:id',authMiddleware, update_category) 
router.delete('/category/:id',deleteCategory) 

export default router;