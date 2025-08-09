import express from 'express';
import { getBlogById, getBlogs } from '../controllers/blogController';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlogById); // ← penting


export default router;
