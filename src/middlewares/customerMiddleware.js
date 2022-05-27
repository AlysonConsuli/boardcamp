import db from "../db.js"

export const customerMiddleware = async (req, res, next) => {
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