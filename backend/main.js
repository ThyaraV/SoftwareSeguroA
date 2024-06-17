import { loginRouter } from './routes/microsoft.js'; 
import passport from 'passport';
import express from 'express';
import "./middleware/microsoft.js";

const app=express();

app.use(passport.initialize());

app.use("/auth",loginRouter);

app.listen(3000,()=>console.log("http://localhost:3000"));