import express from 'express';
const router=express.Router();
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { add_customer_friend,customer_message_add,get_customers,get_customers_seller_message,seller_message_add,get_sellers,seller_admin_message_insert,get_admin_messages,get_seller_messages } from '../Controllers/chat/ChatController.js';


router.post('/chat/customer/add-customer-friend',add_customer_friend)
router.post('/chat/customer/send-message-to-seller',customer_message_add)

router.get('/chat/seller/get-customers/:sellerId',get_customers)
router.get('/chat/seller/get-customer-message/:customerId',authMiddleware,get_customers_seller_message)
router.post('/chat/seller/send-message-to-customer',authMiddleware,seller_message_add)

router.get('/chat/admin/get-sellers',authMiddleware,get_sellers)
router.post('/chat/message-send-seller-admin',authMiddleware,seller_admin_message_insert)
router.get('/chat/get-admin-messages/:receverId',authMiddleware,get_admin_messages)
router.get('/chat/get-seller-messages',authMiddleware,get_seller_messages)
 
 
export default router 