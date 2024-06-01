import mongoose from 'mongoose';

const supplierTypeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    averageRating: {
        type: Number,
        default: 0, // Inicializar con 0, se actualiza con las calificaciones de los proveedores
    },
    serviceOptions: {
        type: [String], // Array de strings para listar opciones o paquetes
        required: false // Opcional, dependiendo de si siempre tienes esta información
    }
}, {
    timestamps: true,
});

const SupplierType = mongoose.model('SupplierType', supplierTypeSchema);

export default SupplierType;
