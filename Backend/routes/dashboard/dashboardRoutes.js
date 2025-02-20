import {get_admin_dashboard_data,get_seller_dashboard_data,add_banner,get_banner,update_banner,get_banners} from '../../Controllers/dashboard/dashboardController.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import express from 'express'
const router=express.Router();


router.get('/admin/get-dashboard-data',authMiddleware, get_admin_dashboard_data)  
router.get('/seller/get-dashboard-data',authMiddleware, get_seller_dashboard_data) 

router.post('/banner/add',authMiddleware, add_banner)  
router.get('/banner/get/:productId',authMiddleware, get_banner)  
router.put('/banner/update/:bannerId',authMiddleware, update_banner)  

router.get('/banners',get_banners)
       
export default router;