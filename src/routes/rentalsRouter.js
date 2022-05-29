import { Router } from "express";
import { getRentals, postRent, postReturnRent } from "../controllers/rentalsController.js";
import { rentalsMiddleware, returnRentMiddleware } from "../middlewares/rentalsMiddlewares.js";

const rentalsRouter = Router()

rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post('/rentals', rentalsMiddleware, postRent)
rentalsRouter.post('/rentals/:id/return', returnRentMiddleware, postReturnRent)
export default rentalsRouter