import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import supplierTypeRoutes from './routes/supplierTypeRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import recommendationRoutes from './routes/recommendationRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

//mongodb+srv://thyaravintimilla:thyaravintimilla@cluster0.krodqag.mongodb.net/festivityfinder?retryWrites=true&w=majority&appName=Cluster0

const port=process.env.PORT || 5000;
connectDB();
const app=express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Cookie de middleware
app.use(cookieParser());
app.use('/api/products',productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/supplierTypes', supplierTypeRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.get('/api/config/paypal',(req,res)=>res.send({clientId:process.env.PAYPAL_CLIENT_ID}));
app.use('/api/notifications', apiRoutes);

const __dirname=path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')));

    app.get('*',(req,res)=>
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))
}else{
    app.get('/',(req,res)=>
    res.end('API is running....'));
}

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`Server running on port ${port}`));