import db from "../db.js";

export const getCustomers = async (req, res) => {
    try {
        const customers = await db.query('SELECT * FROM customers')
        res.send(customers.rows)
    } catch {
        res.sendStatus(500)
    }
}