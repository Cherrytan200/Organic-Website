 
import { get_products,get_categories,price_range_product,query_products,submit_review,get_reviews,product_details } from '../../Controllers/home/homeController.js';
import express from 'express';
const router=express.Router();

router.get('/get-categories',get_categories)
router.get('/get-products',get_products)
router.get('/price-range-latest-product',price_range_product)
router.get('/query-products',query_products)
router.get('/product-details/:slug',product_details)

router.post('/customer/submit-review',submit_review)
router.get('/customer/get-reviews/:productId',get_reviews)
  
export default router 