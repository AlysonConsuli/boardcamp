import { Router } from "express";
import { deleteRent, getRentals, postRent, postReturnRent } from "../controllers/rentalsController.js";
import { deleteRentMiddleware, rentalsMiddleware, returnRentMiddleware } from "../middlewares/rentalsMiddlewares.js";

const rentalsRouter = Router()

rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post('/rentals', rentalsMiddleware, postRent)
rentalsRouter.post('/rentals/:id/return', returnRentMiddleware, postReturnRent)
rentalsRouter.delete('/rentals/:id', deleteRentMiddleware, deleteRent)
export default rentalsRouter