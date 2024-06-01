import express from 'express';
const router = express.Router();
import { getRecommendations } from '../controllers/recommendationController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getRecommendations);

export default router;
