import db from "../db.js"
import { rentalsSchema } from "../schemas/rentalsSchema.js"

export const rentalsMiddleware = async (req, res, next) => {
    const { customerId, gameId, daysRented } = req.body
    const validation = rentalsSchema.validate({ daysRented }, { abortEarly: false })
    if (validation.error) {
        return res.sendStatus(400)
    }
    try {
        const customer = await db.query('SELECT id FROM customers WHERE id = $1', [customerId])
        if (!customer) {
            return res.sendStatus(400)
        }
        const game = await db.query('SELECT id FROM games WHERE id = $1', [gameId])
        if (!game) {
            return res.sendStatus(400)
        }
        const rentals = await db.query(`
        SELECT rentals.id, games."stockTotal" FROM rentals
        JOIN games ON games.id = $1
        WHERE rentals."gameId" = $1`, [gameId])
        if (rentals.rows[0].stockTotal <= rentals.rows.length) {
            return res.sendStatus(400)
        }
        next()
    } catch {
        res.sendStatus(500);
    }
}