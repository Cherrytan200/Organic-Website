
import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { get_seller, request_seller_get, seller_status_update } from '../../Controllers/dashboard/sellerContoller.js';

const router=express.Router();


router.get('/request-seller-get',authMiddleware,request_seller_get);
router.get('/get-seller/:sellerId',authMiddleware,get_seller);
router.post('/seller-status-update',authMiddleware,seller_status_update);


export default router;