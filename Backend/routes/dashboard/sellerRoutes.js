
import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { get_seller, request_seller_get, seller_status_update,get_active_sellers,get_deactive_sellers } from '../../Controllers/dashboard/sellerContoller.js';

const router=express.Router();


router.get('/request-seller-get',authMiddleware,request_seller_get);
router.get('/get-seller/:sellerId',authMiddleware,get_seller);
router.post('/seller-status-update',authMiddleware,seller_status_update);

router.get('/get-sellers',authMiddleware, get_active_sellers) 

router.get('/get-deactive-sellers',authMiddleware, get_deactive_sellers) 

export default router;