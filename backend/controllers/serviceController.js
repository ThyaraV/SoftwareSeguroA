import asyncHandler from "../middleware/asyncHandler.js";
import Service from '../models/servicesModel.js';

//@desc Fetch all services
//@route GET /api/services
//@access Public
const getServices = asyncHandler(async (req, res) => {
    const averageCost = req.query.averageCost;

    let query = {};

    if (averageCost) {
        query.averageCost = { $lte: averageCost };
    }

    const services = await Service.find(query);
    res.json(services);
});

//@desc Create a service
//@route POST /api/services
//@access Private/admin
const createService = asyncHandler(async (req, res) => {
    const { type, description, averageCost, popularity} = req.body;

    const service = new Service({
        type: type || "Sample Type",
        description: description || "Sample Description",
        user: req.user._id,
        averageCost: averageCost || 0,
        popularity: popularity || 0
    });

    const createdService = await service.save();
    res.status(201).json(createdService);
});

//@desc Fetch a single service
//@route GET /api/services/:id
//@access Public
const getServiceById = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (service) {
        res.json(service);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

//@desc Update service
//@route PUT /api/services/:id
//@access Private/Admin
const updateService = asyncHandler(async (req, res) => {
    const { type, description, averageCost, popularity } = req.body;
    const service = await Service.findById(req.params.id);

    if (service) {
        service.type = type || service.type;
        service.description = description || service.description;
        service.averageCost = averageCost || service.averageCost;
        service.popularity = (popularity !== undefined) ? popularity : service.popularity;

        const updatedService = await service.save();
        res.json(updatedService);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

//@desc Delete service
//@route DELETE /api/services/:id
//@access Private/Admin
const deleteService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (service) {
        await service.deleteOne({ _id: service._id });
        res.status(200).json({ message: 'Service deleted' });
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// Obtener todos los servicios
const getAllServices = asyncHandler(async (req, res) => {
    const services = await Service.find({});
    res.json(services);
});

export { getServices, getServiceById, createService, updateService, deleteService, getAllServices };
