import express  from "express";
const router= express.Router();
import { getSupplierTypes,getSupplierTypeById, createSupplierType,updateSupplierType,deleteSupplierType} from "../controllers/supplierTypeController.js";
import {protect,admin} from '../middleware/authMiddleware.js';

router.route('/').get(getSupplierTypes).post(protect,admin,createSupplierType);
router.route('/:id').get(getSupplierTypeById).put(protect,admin,updateSupplierType).delete(protect,admin,deleteSupplierType);

export default router;