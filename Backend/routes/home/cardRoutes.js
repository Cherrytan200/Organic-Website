import express from 'express'
const router =express.Router()
import { add_to_card,get_card_products,delete_card_products,quantity_dec,quantity_inc,add_wishlist,get_wishlist,remove_wishlist } from '../../Controllers/home/cardController.js'

router.post('/home/product/add-to-card',add_to_card) 
router.get('/home/product/get-card-product/:userId',get_card_products)
router.delete('/home/product/delete-card-product/:card_id',delete_card_products)
router.put('/home/product/quantity-inc/:card_id',quantity_inc)
router.put('/home/product/quantity-dec/:card_id',quantity_dec)

router.post('/home/product/add-to-wishlist',add_wishlist) 
router.get('/home/product/get-wishlist-products/:userId',get_wishlist) 
router.delete('/home/product/remove-wishlist-product/:wishlistId',remove_wishlist) 

export default router;