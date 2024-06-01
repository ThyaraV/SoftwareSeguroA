import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    supplierType: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref:"SupplierType", // Referencia al modelo de tipo de proveedor
    },
    name: {
        type: String,
        required: true,
    },
    image:{
        type:String,
        required:true,
    },
    priceRange: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;
