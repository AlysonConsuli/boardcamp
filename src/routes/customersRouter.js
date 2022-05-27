import { Router } from "express";
import { getCustomer, getCustomers } from "../controllers/customersController.js";
import { customerMiddleware } from "../middlewares/customerMiddleware.js";

const customersRouter = Router()

customersRouter.get('/customers', getCustomers)
customersRouter.get('/customers/:id', customerMiddleware, getCustomer)
export default customersRouter