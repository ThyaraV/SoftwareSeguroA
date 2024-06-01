import express  from "express";
const router= express.Router();
import { getSuppliers,getSupplierById,createSupplier,updateSupplier,deleteSupplier} from "../controllers/supplierController.js";
import {protect,admin} from '../middleware/authMiddleware.js';

router.route('/').get(getSuppliers).post(protect,admin,createSupplier);
router.route('/:id').get(getSupplierById).put(protect,admin,updateSupplier).delete(protect,admin,deleteSupplier);

export default router;