// src/controllers/blogController.ts
import { Request, Response } from 'express';
import { Blog } from '../models/blogModel';

// GET /api/blogs
export const getBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await Blog.findAll({
      order: [['createdAt', 'DESC']], // urut terbaru dulu
    });
    res.json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
};

// GET /api/blogs/:id
export const getBlogById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog tidak ditemukan' });
    }

    res.json(blog);
  } catch (err) {
    console.error('Error fetching blog by id:', err);
    res.status(500).json({ message: 'Error fetching blog' });
  }
};
