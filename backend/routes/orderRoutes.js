import express from "express";
const router=express.Router();
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    getTopRated,
    updateOrderToDelivered,
    getOrders,
    getMyOrdersWithPreferences,
    getTopSuppliersInRange
    
} from "../controllers/orderController.js";
import {protect,admin} from '../middleware/authMiddleware.js';


router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders);
router.route('/mine').get(protect,getMyOrders);
router.get('/top-rated-suppliers', getTopRated);
router.route('/myPreferences').get(protect, getMyOrdersWithPreferences);
router.route('/:id').get(protect,admin,getOrderById);
router.route('/:id/pay').put(protect,updateOrderToPaid);
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered);
router.get('/top-suppliers', protect, getTopSuppliersInRange);




export default router;
