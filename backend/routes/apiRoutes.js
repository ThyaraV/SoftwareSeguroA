import express from 'express';
const router = express.Router();
import { sendEmail } from '../controllers/apiController.js'; // Asegúrate de que la ruta sea correcta

// Define a route for sending emails
router.post('/send-email', sendEmail);

export default router; // Usa export default para módulos ES6


