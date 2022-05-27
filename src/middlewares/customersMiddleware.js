import db from "../db.js"
import { customersSchema } from "../schemas/customersSchema.js"

export const customerIdMiddleware = async (req, res, next) => {
    const { id } = req.params
    try {
        const customer = await db.query(`
        SELECT * FROM customers
        WHERE id = $1`, [id])
        if (!customer.rows[0]) {
            return res.sendStatus(404)
        }
        res.locals.customer = customer.rows[0]
        next()
    } catch {
        return res.sendStatus(500);
    }
}

export const customersMiddleware = async (req, res, next) => {
    const { cpf } = req.body
    const validation = customersSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        return res.sendStatus(400)
    }
    try {
        const conflictCpf = await db.query('SELECT cpf FROM customers WHERE cpf = $1', [cpf])
        if (conflictCpf.rows[0]?.cpf) {
            return res.sendStatus(409)
        }
        next()
    } catch {
        res.sendStatus(500);
    }
}