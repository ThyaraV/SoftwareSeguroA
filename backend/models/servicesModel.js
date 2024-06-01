import mongoose from 'mongoose';

const servicesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    averageCost: {
        type: Number,
        required: false, 
    },
    popularity: {
        type: Number,
        default: 0, 
    }
}, {
    timestamps: true,
});

const Service = mongoose.model('Service', servicesSchema);

export default Service;
