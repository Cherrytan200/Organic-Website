
import { place_order,get_customer_dashboard_data,get_orders,get_order_details,create_payment,order_confirm,get_admin_order,get_admin_orders,admin_order_status_update,get_seller_order,get_seller_orders,seller_order_status_update } from '../../Controllers/order/orderController.js';
import express from 'express';
const router=express.Router();
// Customer
router.post('/home/order/place-order',place_order) 
router.get('/home/coustomer/get-dashboard-data/:userId',get_customer_dashboard_data)
router.get('/home/coustomer/get-orders/:customerId/:status',get_orders)
router.get('/home/coustomer/get-order-details/:orderId',get_order_details)

router.post('/order/create-payment',create_payment)
router.get('/order/confirm/:orderId',order_confirm)

// Admin
router.get('/admin/orders',get_admin_orders)
router.get('/admin/order/:orderId',get_admin_order)
router.put('/admin/order-status/update/:orderId',admin_order_status_update)

// Seller
router.get('/seller/orders/:sellerId',get_seller_orders)
router.get('/seller/order/:orderId',get_seller_order)
router.put('/seller/order-status/update/:orderId',seller_order_status_update)

export default router;