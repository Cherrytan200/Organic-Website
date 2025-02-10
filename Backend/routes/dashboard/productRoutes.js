import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { add_product, product_get, products_get ,product_update, product_image_update} from '../../Controllers/dashboard/productController.js';
const router=express.Router();

router.post('/product-add',authMiddleware,add_product);
router.get('/products-get',authMiddleware,products_get);
router.get('/product-get/:productId',authMiddleware,product_get);
router.post('/product-update',authMiddleware,product_update);
router.post('/product-image-update',authMiddleware,product_image_update);



export default router;