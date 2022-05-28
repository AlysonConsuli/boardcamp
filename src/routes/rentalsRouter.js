import { Router } from "express";
import { getRentals, postRent } from "../controllers/rentalsController.js";

const rentalsRouter = Router()

rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post('/rentals', postRent)
export default rentalsRouter