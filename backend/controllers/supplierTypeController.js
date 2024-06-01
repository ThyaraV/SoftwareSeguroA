import asyncHandler from "../middleware/asyncHandler.js";
import SupplierType from '../models/supplierTypeModel.js';

//@desc Fetch all supplier types
//@route GET /api/suppliertypes
//@access Public
const getSupplierTypes = asyncHandler(async (req, res) => {
    const supplierTypes = await SupplierType.find({});
    res.json(supplierTypes);
});

//@desc Create a supplier type
//@route POST /api/suppliertypes
//@access Private/admin
const createSupplierType = asyncHandler(async (req, res) => {
    const supplierType = new SupplierType({
        user: req.user._id,
        category: "Sample Category",
        description: "Sample Description",
        averageRating: 0,
        serviceOptions: [] // Opcional, dependiendo de si siempre tienes esta información
    });

    const createdSupplierType = await supplierType.save();
    res.status(201).json(createdSupplierType);
});

//@desc Fetch a single supplier type
//@route GET /api/suppliertypes/:id
//@access Public
const getSupplierTypeById = asyncHandler(async (req, res) => {
    const supplierType = await SupplierType.findById(req.params.id);

    if (supplierType) {
        res.json(supplierType);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

//@desc Update supplier type
//@route PUT /api/suppliertypes/:id
//@access Private/Admin
const updateSupplierType = asyncHandler(async (req, res) => {
    const { category, description, averageRating, serviceOptions } = req.body;
    const supplierType = await SupplierType.findById(req.params.id);

    if (supplierType) {
        supplierType.category = category || supplierType.category;
        supplierType.description = description || supplierType.description;
        supplierType.averageRating = (averageRating !== undefined) ? averageRating : supplierType.averageRating;
        supplierType.serviceOptions = serviceOptions || supplierType.serviceOptions;

        const updatedSupplierType = await supplierType.save();
        res.json(updatedSupplierType);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

//@desc Delete supplier type
//@route DELETE /api/suppliertypes/:id
//@access Private/Admin
const deleteSupplierType = asyncHandler(async (req, res) => {
    const supplierType = await SupplierType.findById(req.params.id);

    if (supplierType) {
        await supplierType.deleteOne({ _id: supplierType._id });
        res.status(200).json({ message: 'Supplier Type deleted' });
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// Obtener todos los tipos de proveedores
const getAllSupplierTypes = asyncHandler(async (req, res) => {
    const supplierTypes = await SupplierType.find({});
    res.json(supplierTypes);
});

export { getSupplierTypes, getSupplierTypeById, createSupplierType, updateSupplierType, deleteSupplierType, getAllSupplierTypes};
