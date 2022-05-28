import { Router } from "express";
import { getRentals, postRent } from "../controllers/rentalsController.js";
import { rentalsMiddleware } from "../middlewares/rentalsMiddlewares.js";

const rentalsRouter = Router()

rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post('/rentals', rentalsMiddleware, postRent)
export default rentalsRouter