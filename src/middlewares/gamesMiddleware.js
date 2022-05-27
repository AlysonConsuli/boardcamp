import db from "../db.js"
import { gamesSchema } from "../schemas/gamesSchema.js"

export const gamesMiddleware = async (req, res, next) => {
    const { name, stockTotal, pricePerDay, categoryId } = req.body
    const validation = gamesSchema.validate({ name, stockTotal, pricePerDay }, { abortEarly: false })
    if (validation.error) {
        return res.sendStatus(400)
    }
    try {
        const categoryNumber = await db.query('SELECT id FROM categories WHERE id = $1', [categoryId])
        if (!categoryNumber) {
            return res.sendStatus(400)
        }
        const conflictName = await db.query('SELECT name FROM games WHERE name = $1', [name])
        if (conflictName.rows[0]?.name) {
            return res.sendStatus(409)
        }
        next()
    } catch {
        res.sendStatus(500);
    }
}