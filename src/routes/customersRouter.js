import { Router } from "express";
import { getCustomer, getCustomers, postCustomer } from "../controllers/customersController.js";
import { customerIdMiddleware, customersMiddleware } from "../middlewares/customersMiddleware.js";

const customersRouter = Router()

customersRouter.get('/customers', getCustomers)
customersRouter.get('/customers/:id', customerIdMiddleware, getCustomer)
customersRouter.post('/customers', customersMiddleware, postCustomer)
export default customersRouter