
import {create_stripe_connect_account,active_stripe_connect_account,get_seller_payment_details,withdrowal_request,get_payment_request,payment_request_confirm} from "../Controllers/payment/paymentController.js"
import express from 'express'
const router=express.Router();
import { authMiddleware } from '../middlewares/authMiddleware.js';
router.get('/payment/create-stripe-connect-account',authMiddleware,create_stripe_connect_account)

router.put('/payment/active-stripe-connect-account/:activeCode',authMiddleware,active_stripe_connect_account)

router.get('/payment/seller-payment-details/:sellerId',authMiddleware,get_seller_payment_details)
router.post('/payment/withdrowal-request',authMiddleware,withdrowal_request)

router.get('/payment/request',authMiddleware,get_payment_request)
router.post('/payment/request-confirm',authMiddleware,payment_request_confirm)

 
export default router;