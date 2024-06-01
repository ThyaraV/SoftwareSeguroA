import asyncHandler from "../middleware/asyncHandler.js";
import Supplier from '../models/supplierModel.js';

//@desc Fetch all suppliers
//@route GET /api/suppliers
//@access Public
const getSuppliers = asyncHandler(async (req, res) => {
    const suppliers = await Supplier.find({}).populate('supplierType');
    res.json(suppliers);
});

//@desc Create a supplier
//@route POST /api/suppliers
//@access Private/admin
const createSupplier = asyncHandler(async (req, res) => {
    const supplier = new Supplier({
        user: req.user._id,
        serviceType: req.body.serviceType, // Assumed to be passed in the request
        name: "Sample Name",
        image: "/images/sample.jpg",
        priceRange: "Sample Price Range",
        ratings: 0,
        description: "Sample Description"
    });

    const createdSupplier = await supplier.save();
    res.status(201).json(createdSupplier);
});

//@desc Fetch a single supplier
//@route GET /api/suppliers/:id
//@access Public
const getSupplierById = asyncHandler(async (req, res) => {
    const supplier = await Supplier.findById(req.params.id);
    if (supplier) {
        res.json(supplier);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

//@desc Update supplier
//@route PUT /api/suppliers/:id
//@access Private/Admin
const updateSupplier = asyncHandler(async (req, res) => {
    const { supplierType, name, image, priceRange, ratings, description } = req.body;
    const supplier = await Supplier.findById(req.params.id);

    if (supplier) {
        supplier.supplierType = supplierType !== undefined ? supplierType : product.supplierType;
        supplier.name = name || supplier.name;
        supplier.image = image || supplier.image;
        supplier.priceRange = priceRange || supplier.priceRange;
        supplier.ratings = (ratings !== undefined) ? ratings : supplier.ratings;
        supplier.description = description || supplier.description;

        const updatedSupplier = await supplier.save();
        res.json(updatedSupplier);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

//@desc Delete supplier
//@route DELETE /api/suppliers/:id
//@access Private/Admin
const deleteSupplier = asyncHandler(async (req, res) => {
    const supplier = await Supplier.findById(req.params.id);

    if (supplier) {
        await supplier.deleteOne({ _id: supplier._id });
        res.status(200).json({ message: 'Supplier deleted' });
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

export { getSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier };
