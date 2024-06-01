import asyncHandler from "../middleware/asyncHandler.js";
import Order from '../models/orderModel.js';
import Supplier from "../models/supplierModel.js";
import { sendEmail } from './apiController.js';

//@desc Create new order
//@route POST/api/orders
//@access Private
const addOrderItems=asyncHandler(async(req,res)=>{
    const{
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    }=req.body;

    if(orderItems && orderItems.length===0){
        res.status(400);
    }else{
        const order=new Order({
            orderItems: orderItems.map((x)=>({
                ...x,
                product:x._id,
                _id:undefined
            })),
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder=await order.save();
        res.status(201).json(createdOrder);
    }
});

//@desc Get order by ID
//@route GET/api/orders/:id
//@access Private}
const getOrderById=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id).populate('user','name email');
    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
});

//@desc Get logged in user orders
//@route GET/api/orders/myorders
//@access Private
const getMyOrders=asyncHandler(async(req,res)=>{
    const orders= await Order.find({user: req.user._id});
    res.status(200).json(orders);
});

//@desc Update order to paid
//@route PUT/api/orders/:id/pay
//@access Private
const updateOrderToPaid=asyncHandler(async(req,res)=>{
    const order= await Order.findById(req.params.id);
    if(order){
        order.isPaid=true;
        order.paidAt=Date.now();
        order.paymentResult={
            id:req.body.id,
            status:req.body.update_time,
            email_address:req.body.payer.email_address,
        };

        const updatedOrder = await order.save();
        //! nueva validacion
        // Dentro de updateOrderToPaid en orderController.js
        if (updatedOrder.isPaid) {
            try {
              await sendEmail(updatedOrder.shippingAddress.address, updatedOrder._id);
              console.log('Email sent, messageId:', emailResponse.messageId);
            } catch (error) {
              console.error('Error sending email: ', error);
            }
          }

        res.statue(200).json(updatedOrder);
    }else{
        throw new Error('Order not found');
    }
});

//@desc Update order to delivered
//@route PUT/api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id);
    if(order){
        order.isDelivered=true;
        order.deliveredAt=Date.now();

        const updateOrder= await order.save();
        res.status(200).json(updateOrder);
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
});

//@desc Get all orders
//@route GET/api/orders
//@access Private/Admin
const getOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find({}).populate('user','id name');
    res.status(200).json(orders);
});


//
const analyzeUserPreferences = async (userId) => {
    const orders = await Order.find({ user: userId }).populate({
        path: 'orderItems.product',
        populate: {
            path: 'service supplierType',
            model: 'Service SupplierType'
        }
    });

    let userPreferences = {
        serviceTypes: {}, // Almacenar la frecuencia de tipos de servicio
        priceRanges: {}   // Almacenar la frecuencia de rangos de precio
    };

    orders.forEach(order => {
        order.orderItems.forEach(item => {
            // Suponiendo que 'service' y 'supplierType' están disponibles en 'product'
            let serviceType = item.product.service?.type;
            let priceRange = item.product.supplierType?.priceRange;

            // Analizar tipo de servicio
            if (serviceType) {
                userPreferences.serviceTypes[serviceType] = (userPreferences.serviceTypes[serviceType] || 0) + 1;
            }

            // Analizar rango de precio
            if (priceRange) {
                userPreferences.priceRanges[priceRange] = (userPreferences.priceRanges[priceRange] || 0) + 1;
            }
        });
    });

    return userPreferences;
};

const getTopRated = asyncHandler(async (req, res) => {
    try {
        // Obtener proveedores con calificaciones mayores o iguales a 7
        const topRatedSuppliers = await Supplier.find({ ratings: { $gte: 7 } })
            .populate('supplierType', 'category') // Suponiendo que quieras también la categoría del tipo de proveedor
            .sort({ ratings: -1 }); // Ordenar por calificaciones de mayor a menor

        res.status(200).json(topRatedSuppliers);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al obtener los proveedores mejor calificados' });
    }
});


const getMyOrdersWithPreferences = asyncHandler(async(req, res) => {
    const orders = await Order.find({ user: req.user._id });
    if (orders) {
        const preferences = analyzeUserPreferences(orders);
        res.status(200).json({ orders, preferences });
    } else {
        res.status(404).send('No orders found');
    }
});
const getTopSellingSuppliers = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;

    const orders = await Order.find({
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).populate({
        path: 'orderItems.product',
        populate: { path: 'supplierType' }
    });

    let supplierSales = {};

    orders.forEach(order => {
        order.orderItems.forEach(item => {
            const supplierId = item.product.supplierType?._id.toString();
            if (supplierId) {
                if (!supplierSales[supplierId]) {
                    supplierSales[supplierId] = {
                        totalSales: 0,
                        supplierName: item.product.supplierType.name
                    };
                }
                supplierSales[supplierId].totalSales += item.price * item.qty;
            }
        });
    });

    const sortedSuppliers = Object.entries(supplierSales).sort((a, b) => b[1].totalSales - a[1].totalSales);

    res.json(sortedSuppliers.map(([supplierId, data]) => ({ supplierId, ...data })));
});


const getTopSuppliersInRange = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;

    // Verifica si ambas fechas son válidas o no están definidas
    const isValidStartDate = startDate ? !isNaN(new Date(startDate).getTime()) : true;
    const isValidEndDate = endDate ? !isNaN(new Date(endDate).getTime()) : true;

    if (!isValidStartDate || !isValidEndDate) {
        res.status(400).json({ message: "Invalid date format" });
        return;
    }

    const gteDate = startDate ? new Date(startDate) : new Date();
    const lteDate = endDate ? new Date(endDate) : new Date();

    const orders = await Order.find({
        createdAt: { $gte: gteDate, $lte: lteDate }
    }).populate({
        path: 'orderItems.product',
        populate: {
            path: 'supplierType',
            model: 'SupplierType'
        }
    });

    let supplierPriceRanges = {};

    orders.forEach(order => {
        order.orderItems.forEach(item => {
            const supplierId = item.product.supplierType?._id.toString();
            const supplierCategory = item.product.supplierType?.category;
            const supplierRating = item.product.supplierType?.averageRating;
            const itemPrice = item.price;
            if (supplierId) {
                if (!supplierPriceRanges[supplierId]) {
                    supplierPriceRanges[supplierId] = {
                        category: supplierCategory,
                        rating: supplierRating,
                        priceRange: [itemPrice, itemPrice]
                    };
                } else {
                    const currentRange = supplierPriceRanges[supplierId].priceRange;
                    if (itemPrice < currentRange[0]) {
                        currentRange[0] = itemPrice;
                    }
                    if (itemPrice > currentRange[1]) {
                        currentRange[1] = itemPrice;
                    }
                }
            }
        });
    });

    const sortedSuppliers = Object.values(supplierPriceRanges).sort((a, b) => b.rating - a.rating);

    res.json(sortedSuppliers);
});

export{
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    getTopRated,
    updateOrderToDelivered,
    getOrders,
    getMyOrdersWithPreferences,
    getTopSuppliersInRange,
    getTopSellingSuppliers
};
