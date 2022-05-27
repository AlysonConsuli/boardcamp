import { Router } from 'express';
import { getCategories, postCategorie } from '../controllers/categoriesController.js';
import { categoriesMiddleware } from '../middlewares/categoriesMiddleware.js';

const categoriesRouter = Router()

categoriesRouter.get('/categories', getCategories)
categoriesRouter.post('/categories', categoriesMiddleware, postCategorie)
export default categoriesRouter