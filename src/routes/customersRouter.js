import { Router } from "express";
import { getCustomer, getCustomers, postCustomer, putCustomer } from "../controllers/customersController.js";
import { customerIdMiddleware, customersMiddleware, editCustomersMiddleware } from "../middlewares/customersMiddleware.js";

const customersRouter = Router()

customersRouter.get('/customers', getCustomers)
customersRouter.get('/customers/:id', customerIdMiddleware, getCustomer)
customersRouter.post('/customers', customersMiddleware, postCustomer)
customersRouter.put('/customers/:id', editCustomersMiddleware, putCustomer)
export default customersRouter